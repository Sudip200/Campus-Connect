import { Dispatch } from "react";
import axiosInstance from "../axios/axios"

let postNotice = (payload:{
    title:string,
    desc:string,
    file:File|null
}) => async  (dispatch:any,getState:any) => {
    try{
          dispatch({type:'POST_REQUEST'})
          const res = await axiosInstance.postForm(`v1/notices/post`,{
             title:payload.title,
             desc:payload.desc,
             files:payload.file
          });
          if(!res.data){
                dispatch({type:"POST_FAILURE",payload:res.data})
          }
          dispatch({type:'POST_SUCCESS',payload:res.data})
    }catch(err){
          dispatch({type:"POST_FAILURE",payload:(err as Error).message })
    }
}
export {postNotice}