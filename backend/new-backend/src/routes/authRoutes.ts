import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', signup); // Default role: Employee
router.post('/login', login);   // Returns JWT + role

export default router;
