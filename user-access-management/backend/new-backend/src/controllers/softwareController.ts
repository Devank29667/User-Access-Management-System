import { Request, Response } from 'express';
import { AppDataSource } from '../../../src/index';
import { Software } from '../entities/Software';

export const createSoftware = async (req: Request, res: Response) => {
  const { name, description, accessLevels } = req.body;
  const repo = AppDataSource.getRepository(Software);

  try {
    const software = repo.create({ name, description, accessLevels });
    await repo.save(software);
    res.status(201).json(software);
  } catch (err) {
    res.status(500).json({ message: 'Error creating software', error: err });
  }
};