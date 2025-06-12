import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface IAttendence {
  is_present:boolean;
  student_id: string;
  course_id: string;
  date: Date;
}

export interface IAttendenceDocument extends IAttendence, Document {
  toJSON(options?: DocumentToObjectOptions): IAttendence;
}

export type IAttendenceModel = Model<IAttendenceDocument>;

const schema = new Schema({
  is_present: { type: Boolean, required: true },
  student_id: { type: Schema.Types.ObjectId, required: true, ref: 'Student' },
  course_id: { type: Schema.Types.ObjectId, required: true, ref: 'Course' },
  date: { type: Date, required: true, default: Date.now },
}, {
  timestamps: true,
});

const Attendence: IAttendenceModel = model<IAttendenceDocument, IAttendenceModel>('Attendence', schema);

export default Attendence;
