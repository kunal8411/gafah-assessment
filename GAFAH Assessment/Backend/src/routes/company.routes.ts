import express from 'express';
import { createCompany, getCompanies, updateCompany, deleteCompany, getCompaniesWithUsers } from '../controllers/company.controller';

const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

router.get('/companies-with-users', getCompaniesWithUsers);
export default router;
