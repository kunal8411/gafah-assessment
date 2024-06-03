import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  addUserToCompany,
  getUsersNotInCompany, 
  getUsers,
  registerUser,
  loginUser,
} from "../controllers/user.controller";

const router = Router();
router.get('/', getUsers);

// Route to create a user
router.post("/", createUser);

// Route to update a user
router.put("/:id", updateUser);
// Route to add a user to a company

router.post("/add-to-company", addUserToCompany);

// Route to delete a user
router.delete("/:id", deleteUser);
router.get('/not-in-company/:companyId', getUsersNotInCompany);

router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);



export default router;
