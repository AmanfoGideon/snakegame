import type { Position } from "./types";

export function isWallCollision(
  head: Position,
  gridSize: number
): boolean {
  return (
    head.x < 0 ||
    head.x >= gridSize ||
    head.y < 0 ||
    head.y >= gridSize
  );
}

export function isSelfCollision(
  head: Position,
  snake: Position[]
): boolean {
  return snake.slice(1).some((seg) => seg.x === head.x && seg.y === head.y);
}

export function positionsEqual(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}
