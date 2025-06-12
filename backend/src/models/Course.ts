import { Document, Model, model, Schema ,DocumentToObjectOptions} from 'mongoose';
import { stream } from 'winston';

export interface ICourse {
  title: string;
  courseCode: string;
  sem: number;
  stream:string;
}
export interface ICourseDocument extends ICourse, Document {
    toJSON(options:DocumentToObjectOptions):ICourse
}

const courseSchema = new Schema<ICourseDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    courseCode:{
        type:String,
        required:true,
        unique:true
    },
    sem:{
        type:Number,
        required:true
    },
    stream:{
        type:String,
        required:true
    }
  },
  {
    timestamps:true,
    toJSON:{
       transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    }
  },
);
export type ICourseModel = Model<ICourseDocument,ICourse>
const Course = model<ICourseDocument,ICourseModel>('Course',courseSchema)
export default Course;
