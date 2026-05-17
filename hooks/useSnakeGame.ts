"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DIFFICULTY_CONFIG } from "@/lib/constants";
import { isSelfCollision, isWallCollision } from "@/lib/collision";
import {
  canChangeDirection,
  generateFood,
  getInitialSnake,
  getNextHead,
  isFoodEaten,
} from "@/lib/gameLogic";
import { calculateLevel, calculateSpeed } from "@/lib/score";
import { sounds } from "@/lib/sound";
import type { Difficulty, Direction, GameStatus, Position } from "@/lib/types";

interface UseSnakeGameOptions {
  difficulty: Difficulty;
  soundEnabled: boolean;
  onGameOver: (score: number) => void;
}

export function useSnakeGame({
  difficulty,
  soundEnabled,
  onGameOver,
}: UseSnakeGameOptions) {
  const gridSize = DIFFICULTY_CONFIG[difficulty].gridSize;

  const [snake, setSnake] = useState<Position[]>(() =>
    getInitialSnake(gridSize)
  );
  const [food, setFood] = useState<Position>(() =>
    generateFood(gridSize, getInitialSnake(gridSize))
  );
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [foodEaten, setFoodEaten] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeSurvived, setTimeSurvived] = useState(0);
  const [ateFlash, setAteFlash] = useState(false);

  const foodRef = useRef(food);
  const scoreRef = useRef(0);
  const foodEatenRef = useRef(0);
  const levelRef = useRef(1);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const statusRef = useRef<GameStatus>("idle");
  const onGameOverRef = useRef(onGameOver);

  foodRef.current = food;
  scoreRef.current = score;
  foodEatenRef.current = foodEaten;
  levelRef.current = level;
  directionRef.current = direction;
  nextDirectionRef.current = nextDirection;
  statusRef.current = status;
  onGameOverRef.current = onGameOver;

  const resetGame = useCallback(() => {
    const initialSnake = getInitialSnake(gridSize);
    setSnake(initialSnake);
    const newFood = generateFood(gridSize, initialSnake);
    setFood(newFood);
    foodRef.current = newFood;
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    setScore(0);
    scoreRef.current = 0;
    setFoodEaten(0);
    foodEatenRef.current = 0;
    setLevel(1);
    levelRef.current = 1;
    setTimeSurvived(0);
    setAteFlash(false);
    setStatus("playing");
    statusRef.current = "playing";
    sounds.start(soundEnabled);
  }, [gridSize, soundEnabled]);

  const startGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  const pauseGame = useCallback(() => {
    setStatus((prev) => {
      const next = prev === "playing" ? "paused" : prev === "paused" ? "playing" : prev;
      statusRef.current = next;
      return next;
    });
  }, []);

  const changeDirection = useCallback((dir: Direction) => {
    if (
      canChangeDirection(nextDirectionRef.current, dir) &&
      canChangeDirection(directionRef.current, dir)
    ) {
      setNextDirection(dir);
      nextDirectionRef.current = dir;
    }
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    const speed = calculateSpeed(difficulty, foodEatenRef.current);

    const tick = () => {
      if (statusRef.current !== "playing") return;

      const dir = nextDirectionRef.current;
      setDirection(dir);
      directionRef.current = dir;

      setSnake((prevSnake) => {
        const head = getNextHead(prevSnake[0], dir);
        const currentFood = foodRef.current;

        if (
          isWallCollision(head, gridSize) ||
          isSelfCollision(head, prevSnake)
        ) {
          setStatus("gameover");
          statusRef.current = "gameover";
          sounds.gameOver(soundEnabled);
          onGameOverRef.current(scoreRef.current);
          return prevSnake;
        }

        const ate = isFoodEaten(head, currentFood);
        const newSnake = [head, ...prevSnake];

        if (!ate) {
          newSnake.pop();
        } else {
          sounds.eat(soundEnabled);
          setAteFlash(true);
          setTimeout(() => setAteFlash(false), 150);

          const newFoodEaten = foodEatenRef.current + 1;
          const newLevel = calculateLevel(newFoodEaten);
          const points = 10 * newLevel;

          foodEatenRef.current = newFoodEaten;
          scoreRef.current += points;

          setFoodEaten(newFoodEaten);
          setScore(scoreRef.current);
          const newFoodPos = generateFood(gridSize, newSnake);
          setFood(newFoodPos);
          foodRef.current = newFoodPos;

          if (newLevel > levelRef.current) {
            levelRef.current = newLevel;
            setLevel(newLevel);
            sounds.levelUp(soundEnabled);
          }
        }

        return newSnake;
      });
    };

    const interval = setInterval(tick, speed);
    return () => clearInterval(interval);
  }, [status, difficulty, gridSize, soundEnabled, foodEaten]);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = setInterval(() => {
      setTimeSurvived((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  useEffect(() => {
    const initialSnake = getInitialSnake(gridSize);
    setSnake(initialSnake);
    const newFood = generateFood(gridSize, initialSnake);
    setFood(newFood);
    foodRef.current = newFood;
  }, [gridSize]);

  return {
    snake,
    food,
    direction,
    status,
    score,
    foodEaten,
    level,
    timeSurvived,
    gridSize,
    ateFlash,
    startGame,
    pauseGame,
    resetGame,
    changeDirection,
    setStatus,
  };
}
