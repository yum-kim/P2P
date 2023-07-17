import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './MessageRoom.module.scss';
import Input from '../../element/Input/Input';
import {  BsSend, BsFillPersonFill, BsThreeDots, BsArrowLeftShort } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import useInput from '../../../hooks/useInput';
import MessageList from '../MessageList/MessageList';
import Profile from '../../common/Profile/Profile';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { getChatDetailRequest, createChatRequest, resetChatDetailRequset, resetAllChatError, updateCurrentChatUserRequest } from '../../../store/slices/chat';
import Loading from '../../common/Loading/Loading';
import useModal from '../../../hooks/useModal';

interface IMessage {
    id: number,
    chatMessage: string,
    sendUserId: number,
    receiveUserId: number,
    createAt: string,
    updatedAt?: string,
    deleteAt?: string
}

const MessageRoom = ({ onClose }) => {
    const [messages, setMessages] = useState([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const { socket } = useSelector((state: RootState) => state.socket);
    const { cursor, getChatDetailLoading, getChatDetailDone, getChatDetailError, createChatLoading, createChatDone, createChatError, fetchedChatDetails, chatDetails, currentChatUser } = useSelector((state: RootState) => state.chat);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [message, onChangeMessage, setMessage] = useInput('');
    const [isLastPage, setIsLastPage] = useState(false);
    const intersectingRef = useRef<HTMLDivElement | null>(null);
    const { isIntersecting } = useInfiniteScroll(intersectingRef, { threshold: 0.3 });
    const dispatch = useDispatch();
    const { Modal, onShowModal } = useModal(false);

    const onSubmitMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !currentChatUser.userid) return;
        dispatch(createChatRequest({ chatMessage: message, receiveUserId: currentChatUser.userid}));
        socket?.emit('message', {chatMessage: message, receiveUserId: currentChatUser.userid});
        setMessage('');
    }, [message]);
    
    useEffect(() => {
        if (createChatDone) {
            messageEndRef?.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [createChatDone]);

    useEffect(() => {
        socket?.on('getMessage', (message) => {
            console.log('socket getMessage: ', message);
            setMessages((prevMessages) => [message.payload, ...prevMessages]);
        });
    }, [socket]);

    const onCloseMessageRoom = useCallback(() => {
        dispatch(resetChatDetailRequset());
        dispatch(updateCurrentChatUserRequest(null));
        onClose();
    }, []);

    const getChatDetail = useCallback(() => {
        dispatch(getChatDetailRequest({ chatUserId: user.id, chatUserId2: currentChatUser.userid || 1, cursor, size: 20 }));
    }, [currentChatUser?.username, cursor]);

    const onResetCurrentRoom = useCallback(() => {
        setMessages([]);
        if (currentChatUser?.username) {
            dispatch(resetChatDetailRequset());
            setIsLastPage(false);
        };
    }, [currentChatUser?.username]);

    useEffect(() => { 
        onResetCurrentRoom();
    }, [currentChatUser?.username]);

    useEffect(() => {
        inputRef?.current.focus();

        console.log('room mount!');
        // getChatDetail();
    }, []);

    useEffect(() => {
        //스크롤 페이징 아니고, cursor가 null일 때만
        if (!cursor && fetchedChatDetails.length !== 0) getChatDetail();

        //FIXME: 마지막 페이지일 때도 cursor가 null인데 안받아야됨 예외 추가!
        // => 이대로 하면 방 닫았다가 다른 채팅방 열면 fetchedData가 0개라 호출이 안됨. 새로 열린 방이 아닐 경우 판단 조건 필요

    }, [cursor]);

    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages, ...fetchedChatDetails]);
    }, [fetchedChatDetails]);

    useEffect(() => {
        if (getChatDetailDone && fetchedChatDetails.length === 0) setIsLastPage(true);
    }, [getChatDetailDone]);

    useEffect(() => {
        if (!getChatDetailLoading && isIntersecting && !isLastPage) {
            getChatDetail();
        };
    }, [isIntersecting, isLastPage]);
    
    useEffect(() => {
        if (!getChatDetailError) return;
        onShowModal("데이터를 불러오는 중 오류가 발생했습니다", {
            cancel: () => {
                dispatch(resetAllChatError());
            }
        })
    }, [getChatDetailError]);

    useEffect(() => {
        if (!createChatError) return;
        onShowModal("메시지 전송 중 오류가 발생했습니다", {
            cancel: () => {
                dispatch(resetAllChatError());
            }
        })
    }, [createChatError]);
    return (
        <section className={styles.messageRoom}>
            {(getChatDetailLoading || createChatLoading) && <Loading />}

            <Modal />
            <article className={styles.top}>
                <div>
                    <button onClick={onCloseMessageRoom} className={styles.closeBtn}>
                        <BsArrowLeftShort />
                    </button>
                    <Profile user={currentChatUser} />
                    <div className={styles.name}>
                        <h3 className={styles.usercode}>{currentChatUser?.usercode}</h3>
                        <span className={styles.username}>{currentChatUser?.username}</span>
                    </div>
                    <button className={styles.dotsBtn}>
                        <BsThreeDots />
                    </button>
                </div>
            </article>
            <article className={styles.content}>
                <div ref={messageEndRef}></div>

                {messages.map((message) => (
                    <div
                    key={message.id}
                    className={`${styles.textBox} ${message.sendUserId == user?.id ? styles.sended : styles.received}`}
                    >
                        <div className={styles.profile}>
                            {message.sendUserId === user?.id ?
                                (user?.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />) :
                                (currentChatUser?.profileImagePath ? <img src={currentChatUser.profileImagePath} alt="프로필" /> : <BsFillPersonFill />)
                            }
                        </div>
                        <div className={styles.message}>
                            <p className={`${styles.ballon}`}>{message.chatMessage}</p>
                            <span className={styles.time}>{message.createAt}</span>
                        </div>
                    </div>
                ))}

                <div ref={intersectingRef}></div>
            </article>
            <form className={styles.form} onSubmit={onSubmitMessage}>
                <Input type="text" variant="secondary" ref={inputRef} value={message} onChange={onChangeMessage} placeholder="메시지를 입력해주세요." />
                <button type="submit">
                    <BsSend />
                </button>
            </form>
        </section>
    );
};

export default MessageRoom;