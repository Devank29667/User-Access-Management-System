import { Router } from 'express';
import { roleMiddleware } from '../middlewares/authMiddleware';
import { submitRequest, updateRequestStatus, listPendingRequests } from '../controllers/requestController';

const router = Router();

// Employee submits access request
router.post('/', roleMiddleware(['Employee']), submitRequest);

// Manager views and updates requests
router.get('/pending', roleMiddleware(['Manager']), listPendingRequests);
router.patch('/:id', roleMiddleware(['Manager']), updateRequestStatus);

export default router;