import express from 'express';
import { SlotMachineController } from '../controllers/SlotMachineController';
import { validateRequest } from '../middlewares/validateRequest';
import { spinSchema } from '../schemas/slotMachineSchemas';

const router = express.Router();

router.post('/spin/:userId', validateRequest(spinSchema), SlotMachineController.spin);

export default router;