import { get } from "http";
import axios from "../axios/axios"
import { Attendance } from "../reducers/attendenceReducer";

let fetchAttendance = (payload:{
    course_id?: string;
    date?: string;
}) => {
    return async (dispatch: any) => {
        dispatch({ type: "FETCH_ATTENDANCE_REQUEST" });
        try {
            let response = await axios.get("v1/attendance/get-all", { params: payload });
            if (!response.data) {
                throw new Error("No attendance data found");
            }
            let data = response.data.attendanceRecords as Attendance[];
            console.log("Attendance data fetched:", data);
            dispatch({ type: "FETCH_ATTENDANCE_SUCCESS", payload: data });
        } catch (error) {
            dispatch({ type: "FETCH_ATTENDANCE_FAILURE", payload: (error as Error).message });
        }
    };
};

let addAttendance = (attendance: Attendance) => {
    return  (dispatch: any) => {
        console.log("Adding attendance:", attendance);
        dispatch({ type: "ADD_ATTENDANCE", payload: attendance });
    };
};

let updateAttendance = (attendance: Attendance) => {
    return (dispatch: any) => {
        console.log("Updating attendance:", attendance);
        dispatch({ type: "UPDATE_ATTENDANCE", payload: attendance });
    };
};
let postAttendance =  (students:any) => {
    return async (dispatch: any,getState: any) => {
        console.log("Posting attendance for students:", students);
        try {
            let response = await axios.post("v1/attendance/mark", {
                attendance: students,
            });
            console.log("Attendance response:", response);
            if (response.status === 201) {
                console.log("Attendance added successfully");
            } else {
                throw new Error("Failed to add attendance");
            }
        } catch (error) {
            console.error("Error adding attendance:", error);
        }
    };
}

export { fetchAttendance, addAttendance, updateAttendance ,postAttendance };
