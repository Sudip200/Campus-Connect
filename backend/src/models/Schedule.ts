import { Model, Document, Schema, model, DocumentToObjectOptions, Types } from 'mongoose';
export enum Days {
  sun = 'sun',
  mon = 'mon',
  tue = 'tue',
  wed = 'wed',
  thus = 'thus',
  fri = 'fri',
  sat = 'sat',
}
export interface ISchedule {
  course_id: string | Schema.Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
}
export interface IScheduleDocument extends ISchedule, Document {
  toJSON(options?: DocumentToObjectOptions): ISchedule;
}
type IScheduleModel = Model<IScheduleDocument>;

let scheduleSchema = new Schema<IScheduleDocument>(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    day: {
      type: String,
      required: true,
      enum: Object.values(Days),
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
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
  },
);
let Schedule: IScheduleModel = model<IScheduleDocument, IScheduleModel>('Schedule', scheduleSchema);
export default Schedule;
