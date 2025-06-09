
export interface Attendance{ 
    is_present: boolean;
    student_id: string;
    course_id: string;
    date: string;
}
export interface AttendanceState {
    attendance: Attendance[];
    isLoading: boolean;
    error: string | null;
}
const initialState: AttendanceState = {
    attendance: [],
    isLoading: false,
    error: null,
};
const attendanceReducer = (state = initialState, action: { type: string; payload?: any }): AttendanceState => {
    switch (action.type) {
        case "FETCH_ATTENDANCE_REQUEST":
            return { ...state, isLoading: true };
        case "FETCH_ATTENDANCE_SUCCESS":
            return { ...state, attendance: action.payload, isLoading: false };
        case "FETCH_ATTENDANCE_FAILURE":
            return { ...state, error: action.payload, isLoading: false };
        case "ADD_ATTENDANCE":
            return { ...state, attendance: [...state.attendance, action.payload] };
        case "UPDATE_ATTENDANCE":
            return {
                ...state,
                attendance: state.attendance.some((att) => att.student_id === action.payload.student_id)
                    ? state.attendance.map((att) =>
                        att.student_id === action.payload.student_id
                            ? { ...att, ...action.payload }
                            : att
                    )
                    : [...state.attendance, action.payload],
            };
        default:
            return state;
    }
};
export default attendanceReducer;