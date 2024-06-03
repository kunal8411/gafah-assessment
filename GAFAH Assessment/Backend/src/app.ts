import express from 'express';
import bodyParser from 'body-parser';
import companyRoutes from './routes/company.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
const app = express();
app.use(bodyParser.json());
const cors = require("cors");

const mongoose = require('mongoose');

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/gafah-assessment");


app.use('/api/companies', companyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
