const initialState:PostState = Object.freeze({
    isLoading:false,
    isError:null,
    response:null
});
export interface PostState{
    isLoading:boolean,
    isError:any,
    response:any
}
interface Action {
    type: string;
    payload?: any;
}

const postReducer = (state = initialState, action: Action): PostState => {
    switch (action.type) {
        case "POST_REQUEST":
            return { ...state, isLoading: true };
        case "POST_SUCCESS":
            return { ...state, response:action.payload,isLoading:false};
        case "POST_FAILURE":
            return { ...state, isError: action.payload, isLoading: false };
        default:
            return state;
    }
}
export default postReducer