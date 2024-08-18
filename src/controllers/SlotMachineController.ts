import { Request, Response } from 'express';
import { userService } from '../services/UserService';
import { slotMachineService } from '../services/SlotMachineService';
import { SpinInput } from '../schemas/slotMachineSchemas';
import httpStatus from 'http-status';

export class SlotMachineController {
  static async spin(req: Request<SpinInput>, res: Response): Promise<void> {
    const { userId } = req.params;
    const user = userService.getUser(userId);
    
    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    if (user.coins < 1) {
      res.status(httpStatus.BAD_REQUEST).json({ error: 'Not enough coins' });
      return;
    }

    user.coins -= 1;
    
    const spinResult = slotMachineService.spin();
    const winnings = slotMachineService.calculateWinnings(spinResult);
    
    user.coins += winnings;
    userService.updateUserCoins(userId, user.coins);

    res.json({
      spin_result: spinResult,
      winnings: winnings,
      coins: user.coins
    });
  }
}