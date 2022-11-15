export const initialState = {
    mainPosts: [{
        postId: 1,
        user: {
            id: 1,
            nickname: 'yumi',
        },
        content: 'next로 프로젝트를 하는 중인데 쉽지않아요 . .',
        imagePath: 'https://images.velog.io/images/jay/post/3a497590-d1b6-414c-9f3f-7b6c7eb18f6d/img.png'
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default reducer;