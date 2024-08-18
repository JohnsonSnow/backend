type Fruit = "cherry" | "lemon" | "apple" | "banana";

const REEL1: Fruit[] = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"];
const REEL2: Fruit[] = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"];
const REEL3: Fruit[] = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"];

const REWARDS: { [key: string]: { [key: number]: number } } = {
  "cherry": { 3: 50, 2: 40 },
  "apple": { 3: 20, 2: 10 },
  "banana": { 3: 15, 2: 5 },
  "lemon": { 3: 3, 2: 0 }
};

class SlotMachineService {
  spin(): Fruit[] {
    return [
      this.getRandomFruit(REEL1),
      this.getRandomFruit(REEL2),
      this.getRandomFruit(REEL3)
    ];
  }

  calculateWinnings(result: Fruit[]): number {
    if (result[0] === result[1] && result[1] === result[2]) {
      return REWARDS[result[0]][3];
    } else if (result[0] === result[1]) {
      return REWARDS[result[0]][2];
    }
    return 0;
  }

  private getRandomFruit(reel: Fruit[]): Fruit {
    return reel[Math.floor(Math.random() * reel.length)];
  }
}

export const slotMachineService = new SlotMachineService();