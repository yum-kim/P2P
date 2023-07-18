import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './MessageRoom.module.scss';
import Input from '../../element/Input/Input';
import {  BsSend, BsFillPersonFill, BsThreeDots, BsArrowLeftShort } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import useInput from '../../../hooks/useInput';
import Profile from '../../common/Profile/Profile';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import { getChatDetailRequest, createChatRequest, resetChatCursorRequset, resetAllChatError, resetChatDetailRequset } from '../../../store/slices/chat';
import Loading from '../../common/Loading/Loading';
import useModal from '../../../hooks/useModal';
import { IMessageRoomUser } from '../MessageList/MessageList';

interface IMessageRoomParams {
    targetUser: IMessageRoomUser,
    onClose: () => void
}

interface IMessage {
    id: number,
    chatMessage: string,
    sendUserId: number,
    receiveUserId: number,
    createAt: string,
    updatedAt?: string,
    deleteAt?: string
}

const MessageRoom = ({ targetUser, onClose }: IMessageRoomParams) => {
    const [messages, setMessages] = useState([]);
    const { user } = useSelector((state: RootState) => state.auth);
    const { socket } = useSelector((state: RootState) => state.socket);
    const { cursor, getChatDetailLoading, getChatDetailDone, getChatDetailError, createChatLoading, createChatDone, createChatError, fetchedChatDetails, chatDetails } = useSelector((state: RootState) => state.chat);
    const messageEndRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [message, onChangeMessage, setMessage] = useInput('');
    const [isLastPage, setIsLastPage] = useState(false);
    const intersectingRef = useRef<HTMLDivElement | null>(null);
    const { isIntersecting } = useInfiniteScroll(intersectingRef, { threshold: 0.3 });
    const dispatch = useDispatch();
    const { Modal, onShowModal } = useModal(false);
    const [prevUser, setPrevUser] = useState(null);

    const onSubmitMessage = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message || !targetUser) return;
        dispatch(createChatRequest({ chatMessage: message, receiveUserId: targetUser.userid}));
        setMessage('');
    }, [message]);
    
    useEffect(() => {
        if (createChatDone) {
            messageEndRef?.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [createChatDone]);

    useEffect(() => {
        socket?.on('getMessage', (message) => {
            setMessages((prevMessages) => [message.payload, ...prevMessages]);
        });
    }, [socket]);

    useEffect(() => {
        if (prevUser?.userid === targetUser.userid) return;

        onResetCurrentRoom();
    }, [targetUser]);

    const onCloseMessageRoom = useCallback(() => {
        dispatch(resetChatCursorRequset());
        onClose();
    }, []);

    const getChatDetail = useCallback(() => {
        dispatch(getChatDetailRequest({ chatUserId: user.id, chatUserId2: targetUser.userid, cursor, size: 20 }));
    }, [cursor, targetUser]);

    const onResetCurrentRoom = useCallback(() => {
        setMessages([]);
        dispatch(resetChatCursorRequset());
        dispatch(resetChatDetailRequset());
        setIsLastPage(false);
        setPrevUser(targetUser);
    }, [targetUser]);

    useEffect(() => {
        inputRef?.current.focus();
        
        return () => {
            onResetCurrentRoom();
        }
    }, []);

    useEffect(() => {
        if (!cursor && chatDetails.length == 0) {
            getChatDetail();
        }
    }, [cursor]);
    
    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages, ...fetchedChatDetails]);
    }, [fetchedChatDetails]);

    useEffect(() => {
        if (getChatDetailDone && chatDetails.length > 0 && fetchedChatDetails.length === 0) setIsLastPage(true);
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
                    <Profile user={targetUser} />
                    <div className={styles.name}>
                        <h3 className={styles.usercode}>{targetUser?.usercode}</h3>
                        <span className={styles.username}>{targetUser?.username}</span>
                    </div>
                    <button className={styles.dotsBtn}>
                        <BsThreeDots />
                    </button>
                </div>
            </article>
            <article className={styles.content}>
                <div ref={messageEndRef}></div>

                {messages.map((message: IMessage) => (
                    <div
                    key={message.id}
                    className={`${styles.textBox} ${message.sendUserId == user?.id ? styles.sended : styles.received}`}
                    >
                        <div className={styles.profile}>
                            {message.sendUserId === user?.id ?
                                (user?.profileImagePath ? <img src={user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />) :
                                (targetUser?.profileImagePath ? <img src={targetUser.profileImagePath} alt="프로필" /> : <BsFillPersonFill />)
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