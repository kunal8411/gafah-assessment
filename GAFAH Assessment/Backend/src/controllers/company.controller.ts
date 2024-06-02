import { Request, Response } from 'express';
import { Company } from '../models/company.model';

export const createCompany = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const company = new Company({ name, description });
  await company.save();
  res.status(201).send(company);
};

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await Company.find();
  res.status(200).send(companies);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const company = await Company.findByIdAndUpdate(id, { name, description }, { new: true });
  res.status(200).send(company);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Company.findByIdAndDelete(id);
  res.status(204).send();
};
