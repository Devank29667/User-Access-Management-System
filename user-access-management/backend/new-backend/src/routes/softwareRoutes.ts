import { Router } from 'express';
import { createSoftware } from '../controllers/softwareController';
import { roleMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Only Admin can create software
router.post('/', roleMiddleware(['Admin']), createSoftware);

export default router;