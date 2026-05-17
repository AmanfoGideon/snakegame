import type { Difficulty, Direction, Position } from "./types";

export const STORAGE_KEYS = {
  highScore: "snake-high-score",
  settings: "snake-settings",
  leaderboard: "snake-leaderboard",
} as const;

export const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; baseSpeed: number; gridSize: number; speedIncrement: number }
> = {
  easy: { label: "Easy", baseSpeed: 200, gridSize: 20, speedIncrement: 3 },
  normal: { label: "Normal", baseSpeed: 150, gridSize: 16, speedIncrement: 5 },
  hard: { label: "Hard", baseSpeed: 100, gridSize: 16, speedIncrement: 8 },
  extreme: { label: "Extreme", baseSpeed: 70, gridSize: 12, speedIncrement: 10 },
};

export const OPPOSITE_DIRECTION: Record<Direction, Direction> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

export const DIRECTION_VECTORS: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const SCORE_PER_FOOD = 10;
export const LEVEL_UP_EVERY = 5;
export const MIN_SPEED = 50;

export const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowUp: "UP",
  ArrowDown: "DOWN",
  ArrowLeft: "LEFT",
  ArrowRight: "RIGHT",
  w: "UP",
  W: "UP",
  s: "DOWN",
  S: "DOWN",
  a: "LEFT",
  A: "LEFT",
  d: "RIGHT",
  D: "RIGHT",
};
