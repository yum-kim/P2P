export const initialState = {
    isShowing: false
}

export const toggleMessage = (data) => {
    return {
        type: 'TOGGLE_MSG',
        data: data
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MSG': {
            return {
                isShowing: action.data
            }
        }
        default:
            return state;
    }
}

export default reducer;