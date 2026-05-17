import type { Direction, Position } from "./types";
import { DIRECTION_VECTORS } from "./constants";
import { positionsEqual } from "./collision";

export function getInitialSnake(gridSize: number): Position[] {
  const mid = Math.floor(gridSize / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
}

export function getNextHead(
  head: Position,
  direction: Direction
): Position {
  const vector = DIRECTION_VECTORS[direction];
  return { x: head.x + vector.x, y: head.y + vector.y };
}

export function generateFood(
  gridSize: number,
  snake: Position[]
): Position {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const freeCells: Position[] = [];

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (!occupied.has(`${x},${y}`)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return { x: 0, y: 0 };
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
}

export function isFoodEaten(head: Position, food: Position): boolean {
  return positionsEqual(head, food);
}

export function canChangeDirection(
  current: Direction,
  next: Direction
): boolean {
  const opposites: Record<Direction, Direction> = {
    UP: "DOWN",
    DOWN: "UP",
    LEFT: "RIGHT",
    RIGHT: "LEFT",
  };
  return opposites[current] !== next;
}
