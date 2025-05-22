import { Request as Req, Response } from 'express';
import { AppDataSource } from '../../../src/index';
import { Request as AccessRequest } from '../entities/Request';
import { Software } from '../entities/Software';
import { User } from '../entities/User';

export const submitRequest = async (req: Req, res: Response) => {
  const { softwareId, accessType, reason } = req.body;
  const repo = AppDataSource.getRepository(AccessRequest);
  const softwareRepo = AppDataSource.getRepository(Software);
  const userRepo = AppDataSource.getRepository(User);

  try {
    const software = await softwareRepo.findOneBy({ id: softwareId });
    const user = await userRepo.findOneBy({ id: req.user!.id });
    if (!software || !user) return res.status(400).json({ message: 'Invalid user or software' });

    const request = repo.create({ user, software, accessType, reason, status: 'Pending' });
    await repo.save(request);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting request', error: err });
  }
};

export const updateRequestStatus = async (req: Req, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const repo = AppDataSource.getRepository(AccessRequest);

  try {
    const request = await repo.findOne({ where: { id: parseInt(id) }, relations: ['user', 'software'] });
    if (!request) return res.status(404).json({ message: 'Request not found' });

    request.status = status;
    await repo.save(request);
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error updating request', error: err });
  }
};

export const listPendingRequests = async (req: Req, res: Response) => {
  const repo = AppDataSource.getRepository(AccessRequest);
  try {
    const requests = await repo.find({ where: { status: 'Pending' }, relations: ['user', 'software'] });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err });
  }
};