
const initialState = {
    isAuthenticated: false,
    user: null,
};

export function authReducer(state = initialState, action) {
    // console.log('auth.reducer.js: authReducer(state = initialState, action)', state, action)
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGIN_FAIL':
            console.log('login fail', action.error)
            return {
                isAuthenticated: false,
                user: null,
                ...state, error: action.error
            };
        case 'LOGOUT':
            return {
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};


