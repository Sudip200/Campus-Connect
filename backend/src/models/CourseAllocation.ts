import { Model, Document, Schema, model, DocumentToObjectOptions, Types } from 'mongoose';

export interface ICourseAllocation {
  faculty_id: Types.ObjectId;
  course_id: Types.ObjectId;
}

export interface ICourseAllocationDocument extends ICourseAllocation, Document {
  toJSON(options?: DocumentToObjectOptions): ICourseAllocation;
}

type ICourseAllocationModel = Model<ICourseAllocationDocument>;

const courseAllocationSchema = new Schema<ICourseAllocationDocument>(
  {
    faculty_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const CourseAllocation: ICourseAllocationModel = model<ICourseAllocationDocument, ICourseAllocationModel>(
  'CourseAllocation',
  courseAllocationSchema
);

export default CourseAllocation;