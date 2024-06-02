import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import bcrypt from 'bcryptjs';

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
