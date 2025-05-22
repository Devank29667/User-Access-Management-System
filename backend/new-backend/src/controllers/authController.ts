import { Request, Response } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../../../src/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

type Role = 'Employee' | 'Manager' | 'Admin';

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const repo = AppDataSource.getRepository(User);

  try {
    const exists = await repo.findOne({ where: { username } });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = repo.create({ username, password: hashed, role: 'Employee' });
    await repo.save(user);

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Signup failed', error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const repo = AppDataSource.getRepository(User);

  try {
    const user = await repo.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: '1h'
    });

    return res.status(200).json({ token, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: 'Login failed', error: err });
  }
};