type Course = {
  _id: string;
  title: string;
  courseCode: string;
  sem: number;
};

type Faculty = {
  id: string;
  name: string;
  courses: Course[];
};

type AllocationState = {
  loading: boolean;
  error: string | null;
  faculties: Faculty[];
};

const initialState: AllocationState = {
  loading: false,
  error: null,
  faculties: [],
};

export const courseAllocationReducer = (
  state = initialState,
  action: any
): AllocationState => {
  switch (action.type) {
    case "FETCH_ALLOCATIONS_REQUEST":
    case "ASSIGN_COURSE_REQUEST":
      return { ...state, loading: true, error: null };

    case "FETCH_ALLOCATIONS_SUCCESS":
      return {
        ...state,
        loading: false,
        faculties: action.payload, // expecting full faculty list from API
      };

    case "ASSIGN_COURSE_SUCCESS":
      // Optional optimistic update (based on dispatched courseId + facultyId)
      const { facultyId, course } = action.payload;
      return {
        ...state,
        loading: false,
        faculties: state.faculties.map((faculty) =>
          faculty.id === facultyId
            ? { ...faculty, courses: [...faculty.courses, course] }
            : faculty
        ),
      };

    case "FETCH_ALLOCATIONS_FAILURE":
    case "ASSIGN_COURSE_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
