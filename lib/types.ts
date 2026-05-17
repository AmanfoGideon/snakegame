export type Position = { x: number; y: number };

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

export type Difficulty = "easy" | "normal" | "hard" | "extreme";

export type GameStatus = "idle" | "playing" | "paused" | "gameover";

export type GameMode = "classic" | "timed" | "challenge";

export interface GameSettings {
  difficulty: Difficulty;
  soundEnabled: boolean;
  theme: string;
}

export interface GameStats {
  score: number;
  highScore: number;
  level: number;
  foodEaten: number;
  timeSurvived: number;
}
