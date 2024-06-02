import { Router } from 'express';
import { createUser, updateUser, deleteUser } from '../controllers/user.controller';

const router = Router();

// Route to create a user
router.post('/', createUser);

// Route to update a user
router.put('/:id', updateUser);

// Route to delete a user
router.delete('/:id', deleteUser);

export default router;
