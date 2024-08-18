import { Request, Response } from 'express';
import { userService } from '../services/UserService';
import { CreateUserInput, UserIdInput } from '../schemas/userSchemas';
import httpStatus from 'http-status';

export class UserController {
  static async createUser(req: Request<CreateUserInput>, res: Response): Promise<void> {
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const { name } = req.body;
  
    try {
      const user = userService.createUser(name);
      res.status(httpStatus.CREATED).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
  }

  static async getUser(req: Request<UserIdInput>, res: Response): Promise<void> {
    const { id } = req.params;
    console.log('Request body:', JSON.stringify(req.params, null, 2));
    logging.log(`User: ${id}`);

    const user = userService.getUser(id);
    if (user) {
      res.json(user);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
  }
}