export const initialState = {
    mainPosts: [{
        postId: 1,
        postDate: '2022.11.11 00:12:12',
        user: {
            id: 1,
            nickname: 'yumi',
            profileImagePath: '/images/myProfile.jpeg'
        },
        content: 'next로 프로젝트를 하는 중인데 쉽지않아요 . .',
        imagePath: 'https://images.velog.io/images/jay/post/3a497590-d1b6-414c-9f3f-7b6c7eb18f6d/img.png',
        Comments: [
            {
                user: 'jemin',
                content: '댓글이당당',
                date: '2022.11.11 00:12:12'
            },
            {
                user: 'jemin',
                content: '댓글이당당1111',
                date: '2022.11.11 00:12:15'
            }
        ]
    }]
}

export const addPost = (data) => {
    return {
        type: 'ADD_POST',
        data: data
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST': {
            return {
                ...state,
                mainPosts: [action.data, ...state.mainPosts]
            }
        }
        default:
            return state;
    }
}

export default reducer;