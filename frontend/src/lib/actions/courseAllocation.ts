import axios  from '../axios/axios'
export const fetchCourseAllocations = () => async (dispatch: any) => {
  dispatch({ type: "FETCH_ALLOCATIONS_REQUEST" });
  try {
    const response = await axios.get("/v1/courses/get-allocations");
    dispatch({ type: "FETCH_ALLOCATIONS_SUCCESS", payload: response.data.faculties });
  } catch (error) {
    dispatch({
      type: "FETCH_ALLOCATIONS_FAILURE",
      payload: (error as Error).message,
    });
  }
};

export const assignCourseToFaculty = ({
  courseId,
  facultyId,
}: {
  courseId: string;
  facultyId: string;
}) => async (dispatch: any) => {
  dispatch({ type: "ASSIGN_COURSE_REQUEST" });
  try {
    await axios.post("/v1/courses/allocate-courses", [
      { course_id: courseId, faculty_id: facultyId },
    ]);
    dispatch({
      type: "ASSIGN_COURSE_SUCCESS",
      payload: {
        course: { _id: courseId }, // optionally include more course details if available
        facultyId,
      },
    });
  } catch (error) {
    dispatch({
      type: "ASSIGN_COURSE_FAILURE",
      payload: (error as Error).message,
    });
  }
};
