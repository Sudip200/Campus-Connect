import { Model, Document, Schema, model, DocumentToObjectOptions, Types } from 'mongoose';

export interface ILeave {
  faculty_id: Types.ObjectId;
  leaveReason: string;
  startDate: Date;
  endDate: Date;
  status?: 'pending' | 'approved' | 'rejected'; // Optional: for leave approval workflow
}

export interface ILeaveDocument extends ILeave, Document {
  toJSON(options?: DocumentToObjectOptions): ILeave;
}

type ILeaveModel = Model<ILeaveDocument>;

const leaveSchema = new Schema<ILeaveDocument>(
  {
    faculty_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    leaveReason: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
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

const Leave: ILeaveModel = model<ILeaveDocument, ILeaveModel>('Leave', leaveSchema);
export default Leave;