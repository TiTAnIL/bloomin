
const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    isLoading: false
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            console.log('login request')
            return {
                isAuthenticated: false,
                isLoading: true,
                error: null
            };
        case 'LOGIN_SUCCESS':
            console.log('login success', action.payload)
            return {
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGIN_FAIL':
            console.log('login fail', action.error)
            return {
                isAuthenticated: false,
                user: null,
                isLoading: false,
                ...state, error: action.error
            };
        case 'LOGOUT':
            console.log('logout')
            return {
                isAuthenticated: false,
                isLoading: false,
                token: null,
                user: null,
            };
        default:
            return state;
    }
};


