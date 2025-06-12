import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface INotice {
  title: string;
  desc: string;
  links: Array<string>;
  attachment_type:string;
}

export interface INoticeDocument extends INotice, Document {
  toJSON(options?: DocumentToObjectOptions): INotice;
}

export type INoticeModel = Model<INoticeDocument>;

const noticeSchema = new Schema<INoticeDocument>(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    links: { type: [String], default: [] },
    attachment_type: {
      type: String,
      default: 'none',
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
  }
);

const Notice: INoticeModel = model<INoticeDocument, INoticeModel>('Notice', noticeSchema);

export default Notice;