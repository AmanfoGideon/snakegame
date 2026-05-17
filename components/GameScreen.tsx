"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pause } from "lucide-react";
import { GameBoard } from "@/components/GameBoard";
import { ScorePanel } from "@/components/ScorePanel";
import { ControlButtons } from "@/components/ControlButtons";
import { GameOverModal } from "@/components/GameOverModal";
import { PauseModal } from "@/components/PauseModal";
import { useSnakeGame } from "@/hooks/useSnakeGame";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { useTouchControls } from "@/hooks/useTouchControls";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMobileGameLock } from "@/hooks/useMobileGameLock";
import { useIsCoarsePointer } from "@/hooks/useIsCoarsePointer";
import { STORAGE_KEYS } from "@/lib/constants";
import type { Difficulty, GameSettings } from "@/lib/types";

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: "normal",
  soundEnabled: true,
  theme: "neon",
};

const VALID_DIFFICULTIES: Difficulty[] = ["easy", "normal", "hard", "extreme"];

function parseDifficulty(value: string | null): Difficulty {
  if (value && VALID_DIFFICULTIES.includes(value as Difficulty)) {
    return value as Difficulty;
  }
  return "normal";
}

export function GameScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlDifficulty = parseDifficulty(searchParams.get("difficulty"));
  const isCoarse = useIsCoarsePointer();

  const [settings] = useLocalStorage<GameSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS
  );
  const [highScore, setHighScore] = useLocalStorage<number>(
    STORAGE_KEYS.highScore,
    0
  );

  const difficulty = urlDifficulty;
  const soundEnabled = settings.soundEnabled;

  const handleGameOver = useCallback(
    (finalScore: number) => {
      setHighScore((prev) => Math.max(prev, finalScore));
    },
    [setHighScore]
  );

  const game = useSnakeGame({
    difficulty,
    soundEnabled,
    onGameOver: handleGameOver,
  });

  const isNewHighScore =
    game.status === "gameover" && game.score > highScore && game.score > 0;

  const isPlaying = game.status === "playing";
  useMobileGameLock(isPlaying);

  useEffect(() => {
    game.startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const controlsEnabled = isPlaying;

  useKeyboardControls({
    onDirection: game.changeDirection,
    onPause: game.pauseGame,
    enabled: game.status === "playing" || game.status === "paused",
  });

  const { onTouchStart, onTouchEnd } = useTouchControls({
    onDirection: game.changeDirection,
    enabled: controlsEnabled,
  });

  const goMenu = useCallback(() => {
    router.push("/");
  }, [router]);

  const displayHighScore = useMemo(
    () => Math.max(highScore, game.score),
    [highScore, game.score]
  );

  return (
    <div className="game-shell safe-area-padding">
      <header className="flex shrink-0 items-center justify-between gap-2 px-2 pt-1 safe-area-top">
        <h1 className="text-base sm:text-lg font-bold text-neon-green truncate">
          HEPAGK SNAKE
        </h1>
        <button
          type="button"
          onClick={game.pauseGame}
          disabled={game.status !== "playing" && game.status !== "paused"}
          className="touch-target flex items-center gap-1 px-3 py-2 rounded-lg border border-white/20 bg-white/5 text-sm text-white active:bg-white/10 disabled:opacity-40 transition-colors shrink-0"
          aria-label="Pause game"
        >
          <Pause className="w-5 h-5" />
          <span className="sr-only">Pause</span>
        </button>
      </header>

      <div className="shrink-0 px-2 py-2">
        <ScorePanel
          score={game.score}
          highScore={displayHighScore}
          level={game.level}
          foodEaten={game.foodEaten}
          timeSurvived={game.timeSurvived}
          compact={isCoarse}
        />
      </div>

      <div className="flex flex-1 min-h-0 items-center justify-center px-2 w-full">
        <GameBoard
          gridSize={game.gridSize}
          snake={game.snake}
          food={game.food}
          ateFlash={game.ateFlash}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      </div>

      <div className="shrink-0 px-2 pb-2 safe-area-bottom">
        {isCoarse ? (
          <ControlButtons
            onDirection={game.changeDirection}
            disabled={!controlsEnabled}
          />
        ) : (
          <p className="hidden md:block text-center text-xs text-zinc-600 py-2">
            Arrow keys / WASD · Space to pause
          </p>
        )}
        {isCoarse && (
          <p className="text-center text-[10px] text-zinc-600 mt-2">
            Swipe on the board or use the pad below
          </p>
        )}
      </div>

      {game.status === "paused" && (
        <PauseModal
          onResume={game.pauseGame}
          onRestart={game.resetGame}
          onMenu={goMenu}
        />
      )}

      {game.status === "gameover" && (
        <GameOverModal
          score={game.score}
          highScore={Math.max(highScore, game.score)}
          timeSurvived={game.timeSurvived}
          foodEaten={game.foodEaten}
          isNewHighScore={isNewHighScore}
          onRestart={game.resetGame}
          onMenu={goMenu}
        />
      )}
    </div>
  );
}
