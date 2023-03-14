import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    GET_POSTS_REQUEST, GET_POSTS_FAILURE, GET_POSTS_SUCCESS,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from "../actions/post";
import produce from 'immer';

export const initialState = {
    getPostsLoading: false,
    getPostsDone: false,
    getPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    allPosts: [
        // {
        // postId: 1,
        // postDate: '2022.11.11 00:12:12',
        // user: {
        //     id: 1,
        //     nickname: 'yumi',
        //     profileImagePath: '/images/myProfile.jpeg'
        // },
        // content: 'next로 프로젝트를 하는 중인데 쉽지않아요 . .',
        // imagePath: 'https://images.velog.io/images/jay/post/3a497590-d1b6-414c-9f3f-7b6c7eb18f6d/img.png',
        // Comments: [
        //     {
        //         user: 'jemin',
        //         content: '댓글이당당',
        //         date: '2022.11.11 00:12:12'
        //     },
        //     {
        //         user: 'jemin',
        //         content: '댓글이당당1111',
        //         date: '2022.11.11 00:12:15'
        //     }
        // ]
        // }
    ],
}

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case GET_POSTS_REQUEST:
                draft.getPostsLoading = true;
                draft.getPostsDone = false;
                draft.getPostsError = null;
                break;
            case GET_POSTS_SUCCESS:
                draft.getPostsLoading = false;
                draft.getPostsDone = true;
                draft.allPosts.push(...action.data);
                break;
            case GET_POSTS_FAILURE:
                draft.getPostsLoading = false;
                draft.getPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                const post = draft.allPosts.find((post) => post.postId == action.data.postId);
                post.Comments.push(action.data);
                break;
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                return state;
        }
    })
};

export default reducer;