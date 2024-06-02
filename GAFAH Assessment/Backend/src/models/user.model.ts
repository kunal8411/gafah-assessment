import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  designation: { type: String },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
});

export const User = model('User', userSchema);
