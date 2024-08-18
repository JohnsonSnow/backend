import express from 'express';
import { UserController } from '../controllers/UserController';
import { validateRequest } from '../middlewares/validateRequest';
import { createUserSchema, userIdSchema } from '../schemas/userSchemas';

const router = express.Router();

router.post('/', validateRequest(createUserSchema), UserController.createUser);
router.get('/:id', validateRequest(userIdSchema), UserController.getUser);

export default router;