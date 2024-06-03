import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  User  from '../models/user.model';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role, designation, company } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role,
    designation,
    company,
  });

  await user.save();
  res.status(201).send(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user:any = await User.findOne({ email });
  if (!user) return res.status(400).send('Email or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ _id: user._id, role: user.role }, 'secretkey');
  res.header('Authorization', token).send({token, role: user.role });
};
