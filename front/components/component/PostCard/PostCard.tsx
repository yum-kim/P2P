import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import styles from './PostCard.module.scss';
import { BsHandThumbsUpFill, BsHandThumbsUp, BsChatLeftTextFill, BsChatLeftText, BsLockFill } from "react-icons/bs";
import { MdPublic, MdOutlineMoreHoriz } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../Comment/Comment';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import Loading from '../../common/Loading/Loading';
import { changePostStatusRequestAction, deletePostRequestAction, changePostHitRequestAction } from '../../../store/actions/post';
import { RootState } from '../../../store/reducers';

interface IPostProps {
    post: IPost
}

export interface IPost {
    id: number,
    user: IUser,
    description: string,
    imagePath: string,
    hit: number,
    comment: IComment[],
    status: string, //public, private
    createAt: string,
    deleteAt: string,
    updatedAt: string,
}

export interface IUser {
    id: number,
    usercode: string,
    username: string,
    password: string
    profileImagePath: string
}

export interface IComment {
    id: number,
    username: string,
    comment: string,
    createAt: string
}

const PostCard = ({ post }: IPostProps) => {
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    const {
        addCommentLoading,
        deletePostLoading,
        changePostStatusLoading,
    } = useSelector((state: RootState) => state.post);
    const { user } = useSelector((state: RootState) => state.auth);
    
    const onToggleLiked = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);
    const onToggleComments = useCallback(() => {
        setShowComments((prev) => !prev);
    }, []);

    //TODO: post status 변경
    const onChangePostStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = {
            id: user.id,
            body: {
                status: "PUBLIC"
            }
        }
        dispatch(changePostStatusRequestAction(data));
    }

    //TODO: post hit API 추가 되면 맞추기
    const onClickLikedButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = {
            id: user.id,
            body: {
                hit: true
            }
        }
        dispatch(changePostHitRequestAction(data));
    }
    
    // const onClickOhterMenu = (e) => {
    //     setOpen(true);
    //     setAnchorEl(e.currentTarget);
    // }
        
    // const onClickOtherMenuList = (e) => {
    //     const { menu } = e.currentTarget.dataset;
    //     console.log(menu);
        
    //     if (menu === "changePostStatus") {
    //         const status = post.status === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    //         dispatch(changePostStatusRequestAction({id: post.id, body: { status }}))
    //     } else if (menu === "deletePost") {
    //         dispatch(deletePostRequestAction(post.id));
    //     }

    //     onCloseOtherMenu();
    // }

    // const onCloseOtherMenu = () => {
    //     setAnchorEl(null);
    //     setOpen(false);
    // }

    return (
        <article className={styles.card}>
            {(addCommentLoading || deletePostLoading || changePostStatusLoading) && <Loading />}

            <div className={styles.top}>
                <div className={styles.profile}>
                    <div className={styles.img}>
                        {post.user.profileImagePath ? <img src={post.user.profileImagePath} alt="프로필" /> : <BsFillPersonFill />}
                    </div>
                    <div className={styles.postInfo}>
                        <p className={styles.name}>{post.user.username}</p>
                        <div>
                            <span className={styles.date}>{post.createAt}</span>
                            <button className={styles.status} onClick={onChangePostStatus}>
                                {post.status === 'PUBLIC' ? <MdPublic title="전체공개" /> : <BsLockFill title="나만보기" />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.otherBtn}>
                    {/* <Button
                        id="otherMenuBtn"
                        aria-controls={open ? 'otherMenuList' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={onClickOhterMenu}
                    >
                        <MdOutlineMoreHoriz />
                    </Button>
                    <Menu
                        id="otherMenuList"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={onCloseOtherMenu}
                        aria-labelledby="otherMenuBtn"
                    >
                        <MenuItem data-menu="changePostStatus" onClick={onClickOtherMenuList}>게시물 {post.status === "PUBLIC"? "나만보기": "전체공개"}로 변경</MenuItem>
                        <MenuItem data-menu="deletePost" onClick={onClickOtherMenuList}>게시물 삭제</MenuItem>
                    </Menu> */}
                </div>
            </div>
            <div className={styles.content}>
                {post.imagePath && <img src={post.imagePath} alt="attached image" />}
                <p className={styles.content}>{post.description}</p>
            </div>
            <div className={styles.reaction}>
                <button className={liked && styles.liked} onClick={onClickLikedButton}>
                    {liked ? <BsHandThumbsUpFill /> : <BsHandThumbsUp />}
                    좋아요 {post.hit}
                </button>
                <button onClick={onToggleComments}>
                    {showComments ? <BsChatLeftTextFill /> : <BsChatLeftText />}
                    댓글
                </button>
            </div>
            {showComments && (<Comment post={post} />)}
        </article>
    );
};

export default PostCard;