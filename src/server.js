// server.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import walletRoutes from './routes/walletRoutes';

const express = require('express');
const bodyParser = require('body-parser');
const walletRoutes = require('./routes/walletRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const loggerMiddleware = require('./middlewares/loggerMiddleware');

const app = express();
const prisma = new PrismaClient();


app.use(bodyParser.json());
app.use(loggerMiddleware); // Middleware de logging
app.use('/api', authMiddleware); // Middleware de autenticação
app.use('/api', walletRoutes);
app.use(errorMiddleware); // Middleware de tratamento de erros
app.use(express.json());

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
  });
  
  app.post('/users', async (req, res) => {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(201).json(user);
  });
  
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });