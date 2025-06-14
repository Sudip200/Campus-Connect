
export interface ICourse {
  _id:string
  title: string;
  courseCode: string;
  sem: number;
  stream:string;
}
export interface State{
  error?:any
  courses:ICourse[]
  isLoading:boolean
}
interface Action {
    type?:string,
    payload?:any
}
const initialState:State  = Object.freeze({
      courses:[],
      error:null,
      isLoading:false
})
const courseReducer = (state: State = initialState, action: Action):State => {
    switch(action.type){
       case "FETCH_COURSE":{
          return {
              ...state,
              isLoading:true
          }
       }
       case "COURSE_FETCH_SUCCESS":{
         return {
            ...state,
            isLoading:false,
            courses:action.payload
         }
       }
       case "COURSE_FETCH_FAILURE":{
         return {
            ...state,
            isLoading:false,
            error:action.payload
         }
       }
       default:{
        return state
       }
    }
}
export { courseReducer} ;