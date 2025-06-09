"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "@/store"; // Update with your actual store path
//import { assignCourseToFaculty } from "@/store/courseSlice"; // Define this action

type Course = {
  id: string;
  name: string;
};

type Faculty = {
  id: string;
  name: string;
  courses: Course[];
};

export default function ManageCourses() {
  const dispatch = useDispatch();
 // const courses = useSelector((state: RootState) => state.course.unassignedCourses);
 // const faculties = useSelector((state: RootState) => state.course.faculties);
 const faculties = [
  {
    id: "F001",
    name: "Dr. Priya Sharma",
    courses: [{ id: "CSE106", name: "Machine Learning" }],
  },
  {
    id: "F002",
    name: "Prof. Anil Mehta",
    courses: [],
  },
  {
    id: "F003",
    name: "Dr. Ritu Kapoor",
    courses: [{ id: "CSE107", name: "Web Technologies" }],
  },
];
const courses = [
  { id: "CSE101", name: "Data Structures" },
  { id: "CSE102", name: "Operating Systems" },
  { id: "CSE103", name: "Computer Networks" },
  { id: "CSE104", name: "Database Management" },
  { id: "CSE105", name: "Software Engineering" },
];

  const handleDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    if (destination.droppableId.startsWith("faculty-")) {
    //   dispatch(assignCourseToFaculty({
    //     courseId: draggableId,
    //     facultyId: destination.droppableId.replace("faculty-", "")
    //   }));
    }
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6 text-slate-800 dark:text-slate-50">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Unassigned Courses */}
        <Droppable droppableId="courses">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Available Courses</h2>
              {courses.map((course: Course, index: number) => (
                <Draggable key={course.id} draggableId={course.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-2 p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-white/[0.05] dark:border-gray-700"
                    >
                      {course.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Faculty Cards */}
        <div className="space-y-6">
          {faculties.map((faculty: Faculty) => (
            <Droppable droppableId={`faculty-${faculty.id}`} key={faculty.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
                >
                  <h2 className="text-lg font-semibold mb-4">{faculty.name}</h2>
                  {faculty.courses.map((course: Course, index: number) => (
                    <Draggable
                      key={course.id}
                      draggableId={course.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-white/[0.05] dark:border-gray-700"
                        >
                          {course.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
