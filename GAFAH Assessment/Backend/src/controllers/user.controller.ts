import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';
import {Company} from '../models/company.model'; 
// Create a user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role, designation, companyId } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      designation,
      companyId,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

// Update user information
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, role, designation } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role, designation },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


// get list of all users

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).send(users);
};
export const addUserToCompany = async (req: Request, res: Response) => {
  const { userId, companyId, role, designation } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Update the user's company, role, and designation
    user.companyId = companyId;
    user.role = role;
    user.designation = designation;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersNotInCompany = async (req: Request, res: Response) => {
  const { companyId } = req.params;

  try {
    const users = await User.find({ companyId: { $ne: companyId } });
    res.json(users);
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};
// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {
    // Extract user data from request body
    const { name, email, password, role, designation } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user document
    const newUser = new User({ name, email, password, role, designation });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
