import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import companyRoutes from './routes/company.routes';
const app = express();
app.use(bodyParser.json());

// Import routes
// const companyRoutes = require('./routes/company');
// const userRoutes = require('./routes/user');

// Use routes
// app.use('/api/companies', companyRoutes);
// app.use('/api/users', userRoutes);

// MongoDB connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/gafah_assessment', {
  useNewUrlParser: true, // Removed if using mongoose >= 6.x
  useUnifiedTopology: true, // Removed if using mongoose >= 6.x
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error:any) => {
  console.error('Error connecting to MongoDB:', error);
});


// import userRoutes from './routes/user.routes';

app.use('/api/companies', companyRoutes);
// app.use('/api/users', userRoutes);

export default app;
