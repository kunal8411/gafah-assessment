import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  designation: string;
  companyId: mongoose.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  designation: { type: String, required: true },
  companyId: { type: mongoose.Types.ObjectId, required: true, ref: 'Company' },
});

export default mongoose.model<IUser>('User', UserSchema);
