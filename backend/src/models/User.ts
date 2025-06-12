import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

import config from '../config/config';
import { Password } from '../services/password';

const passwordService = new Password(config);

export enum UserRole {
  'role1' = 'student',
  'role2' = 'faculty',
  'role3' = 'admin',
}

export interface IUser {
  name:string;
  email: string;
  password: string;
  role: UserRole;
  rollNumber?: string;
  department?: string;
  year?: number;
  section?: string;
  sem?:number;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
  toJSON(options?: DocumentToObjectOptions): Omit<IUser, 'password'>;
}

export type IUserModel = Model<IUserDocument>;

const schema = new Schema<IUserDocument>(
  {
    name:{type:String,required:true,trim:true},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
    rollNumber: { type: String, required: false, trim: true},   // student
    department: { type: String, required: false, trim: true }, // faculty
    year: { type: Number, required: false, min: 1, max: 4 },  // student
    section: { type: String, required: false, trim: true },  // student
    sem:{ type:Number,required:false} // for student
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: IUserDocument, ret: IUser): Omit<IUser, 'password'> => {
        delete ret.password;
        return ret;
      },
    },
  },
);

schema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const password = this.get('password');
  const hash = await passwordService.hashPassword(password);
  this.set('password', hash);
  next();
});

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await passwordService.comparePassword(password, this.password);
};

const User: IUserModel = model<IUserDocument, IUserModel>('User', schema);

export default User;
