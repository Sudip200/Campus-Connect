"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { RootState } from "@/lib/store";
import { assignCourseToFaculty, fetchCourseAllocations } from "@/lib/actions/courseAllocation";



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

export default function DraggableCourse({ courses }: { courses: Course[] }) {
  const dispatch = useDispatch();

  const { faculties } = useSelector((state: RootState) => state.courseAllocation);

  useEffect(() => {
    dispatch(fetchCourseAllocations() as any);
  }, [dispatch]);

  const assignedCourseIds = faculties.flatMap((faculty: Faculty) =>
    faculty.courses.map((course) => course._id)
  );

  const unassignedCourses = courses.filter((course) => !assignedCourseIds.includes(course._id));

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    if (destination.droppableId.startsWith("faculty-")) {
      const facultyId = destination.droppableId.replace("faculty-", "");

      await dispatch(
        assignCourseToFaculty({
          courseId: draggableId,
          facultyId,
        }) as any
      );

      dispatch(fetchCourseAllocations() as any);
    }
  };

  return (
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
            {unassignedCourses.map((course, index) => (
              <Draggable key={course._id} draggableId={course._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-2 p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-white/[0.05] dark:border-gray-700"
                  >
                    {course.title}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Faculty Cards */}
      <div className="space-y-6 mt-6">
        {faculties.map((faculty: Faculty) => (
          <Droppable droppableId={`faculty-${faculty.id}`} key={faculty.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6"
              >
                <h2 className="text-lg font-semibold mb-4">{faculty.name}</h2>
                {faculty.courses.map((course, index) => (
                  <Draggable key={course._id} draggableId={course._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-2 p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-white/[0.05] dark:border-gray-700"
                      >
                        {course.title}
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
  );
}
