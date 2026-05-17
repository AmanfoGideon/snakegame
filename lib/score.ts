import { LEVEL_UP_EVERY, MIN_SPEED, SCORE_PER_FOOD } from "./constants";
import { DIFFICULTY_CONFIG } from "./constants";
import type { Difficulty } from "./types";

export function calculateLevel(foodEaten: number): number {
  return Math.floor(foodEaten / LEVEL_UP_EVERY) + 1;
}

export function calculateSpeed(
  difficulty: Difficulty,
  foodEaten: number
): number {
  const config = DIFFICULTY_CONFIG[difficulty];
  const level = calculateLevel(foodEaten);
  const speed =
    config.baseSpeed - (level - 1) * config.speedIncrement;
  return Math.max(speed, MIN_SPEED);
}

export function scoreFromFood(foodEaten: number, level: number): number {
  return foodEaten * SCORE_PER_FOOD * level;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
