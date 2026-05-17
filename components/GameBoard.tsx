"use client";

import type { Position } from "@/lib/types";

interface GameBoardProps {
  gridSize: number;
  snake: Position[];
  food: Position;
  ateFlash: boolean;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

export function GameBoard({
  gridSize,
  snake,
  food,
  ateFlash,
  onTouchStart,
  onTouchEnd,
}: GameBoardProps) {
  const snakeSet = new Set(snake.map((s) => `${s.x},${s.y}`));
  const headKey = `${snake[0]?.x},${snake[0]?.y}`;

  const cells: React.ReactNode[] = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const key = `${x},${y}`;
      const isHead = key === headKey;
      const isBody = snakeSet.has(key) && !isHead;
      const isFood = food.x === x && food.y === y;

      let cellClass =
        "rounded-[2px] sm:rounded-sm transition-colors duration-100 ";

      if (isHead) {
        cellClass +=
          "bg-neon-green shadow-[0_0_12px_#39ff14,0_0_24px_#39ff14] ";
      } else if (isBody) {
        cellClass += "bg-neon-green/70 shadow-[0_0_6px_#39ff14] ";
      } else if (isFood) {
        cellClass +=
          "bg-neon-red shadow-[0_0_12px_#ff3864,0_0_20px_#ff3864] animate-pulse ";
      } else {
        cellClass += "bg-grid-cell ";
      }

      cells.push(<div key={key} className={cellClass} />);
    }
  }

  return (
    <div
      className={`game-board game-board-touch relative w-full aspect-square max-w-[min(100%,calc(100dvh-16rem))] max-h-[min(100%,calc(100dvh-16rem))] rounded-xl border border-neon-green/30 bg-game-board p-1 shadow-[0_0_30px_rgba(57,255,20,0.15)] transition-shadow ${
        ateFlash ? "shadow-[0_0_40px_rgba(57,255,20,0.4)]" : ""
      }`}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        gap: "2px",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {cells}
    </div>
  );
}
