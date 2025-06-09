import axios from "../axios/axios";
export const login = (payload:{
    email: string;
    password: string;
    isChecked: boolean;
}) => async (dispatch: Dispatch, getState: GetState) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    try{
        let response = await axios.post('v1/auth/login/',{
            email:payload.email,
            password:payload.password
        });
        if(response.data.token){
           dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
        }
    }catch(err){
        dispatch({type:'LOGIN_FAILURE'})
    }
}
export const getUserDetails = () => async (dispatch:Dispatch,getState:GetState) =>{
   try{
       let response = await  axios.get('/v1/user/me');
       dispatch({type:'CHECK_AUTH',payload:response.data.user})
   }catch(err){
       console.log('Failed')
   }  
}

interface User {
    id: number;
    name: string;
}

interface LoginRequestAction {
    type: 'LOGIN_REQUEST';
}

interface LoginSuccessAction {
    type: 'LOGIN_SUCCESS';
    payload: User;
}

interface LogoutSuccessAction {
    type: 'LOGOUT_SUCCESS';
}
interface LoginRequestUnsuccessfull{
    type: 'LOGIN_FAILURE'
}
interface CheckUserAction{
    type: 'CHECK_AUTH'
    payload:User
}

type AuthAction = LoginRequestAction | LoginSuccessAction | LogoutSuccessAction | LoginRequestUnsuccessfull | CheckUserAction;

type Dispatch = (action: AuthAction) => void;
type GetState = () => unknown;

const logout = () => (dispatch: Dispatch, getState: GetState) => {
    setTimeout(() => {
        dispatch({ type: 'LOGOUT_SUCCESS' });
    }, 1000);
}