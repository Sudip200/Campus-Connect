interface Action {
    type: string;
    payload?: any;
}
export interface User{
    name:string;
    email:string;
    rollNumber?:string;
    role:string;

}
interface AuthState {
    isAuthenticated: boolean;
    user:  User | null;
    error: string | null;
    isLoading: boolean;
}
const initialState: AuthState = Object.freeze({
    isAuthenticated: false,
    user: null,
    error: null,
    isLoading: false,
})
const authReducer = (state = initialState, action: Action): AuthState => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, isLoading: true };
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true, user: action.payload, isLoading: false };
        case "LOGIN_FAILURE":
            return { ...state, error: action.payload, isLoading: false };
        case "CHECK_AUTH":
            return {...state,user:action.payload};
        default:
            return state;
    }
}

export default authReducer;
