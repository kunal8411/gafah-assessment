import { Request, Response } from 'express';
import { Company } from '../models/company.model';
import  User  from '../models/user.model';

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


export const getCompaniesWithUsers = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    const companiesWithUsers = await Promise.all(
      companies.map(async (company) => {
        const users = await User.find({ companyId: company._id });
        return { ...company.toObject(), users };
      })
    );
    res.json(companiesWithUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies and users', error });
  }
};