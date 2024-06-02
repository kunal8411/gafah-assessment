import express from 'express';
import { createCompany, getCompanies, updateCompany, deleteCompany } from '../controllers/company.controller';

const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;
