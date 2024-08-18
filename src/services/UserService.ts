import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/User';
import { CONFIG } from '../config/config';

class UserService {
  private users: { [key: string]: User } = {};

  createUser(name: string): User {
    const id = uuidv4();
    const newUser: User = { id, name, coins: CONFIG.INITIAL_COINS };
    this.users[id] = newUser;
    return newUser;
  }

  getUser(id: string): User | null {
    return this.users[id] || null;
  }

  updateUserCoins(id: string, coins: number): User | null {
    const user = this.users[id];
    if (user) {
      user.coins = coins;
      return user;
    }
    return null;
  }
}

export const userService = new UserService();