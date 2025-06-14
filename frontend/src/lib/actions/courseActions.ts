import axiosInstance from "../axios/axios"

const fetchCourses = () => async  (dispath:any)=>{
      try{
          dispath({type:"FETCH_COURSE"})
          let res = await axiosInstance.get('v1/courses/get-all');
          if(!res.data){
                throw new Error("Unable to fetch courses");
          }
          dispath({type:"COURSE_FETCH_SUCCESS",payload:res.data.allCourses})
      }catch(err){
          dispath({
            type:"COURSE_FETCH_FAILURE",
            payload:err
          })
      }
}
export {fetchCourses}

