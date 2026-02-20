import express from 'express'
import { login } from '../controller/loginController';

const adminRoutes = express.Router();

adminRoutes.post('/login',login);

export default adminRoutes;