import { Schema, model } from 'mongoose';

const companySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

export const Company = model('Company', companySchema);
