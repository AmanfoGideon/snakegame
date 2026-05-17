"use client";

import { RotateCcw, Home, Share2, Trophy } from "lucide-react";
import { formatTime } from "@/lib/score";

interface GameOverModalProps {
  score: number;
  highScore: number;
  timeSurvived: number;
  foodEaten: number;
  isNewHighScore: boolean;
  onRestart: () => void;
  onMenu: () => void;
}

export function GameOverModal({
  score,
  highScore,
  timeSurvived,
  foodEaten,
  isNewHighScore,
  onRestart,
  onMenu,
}: GameOverModalProps) {
  const handleShare = async () => {
    const text = `I scored ${score} points in HEPAGK snake! Can you beat me?`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "HEPAGK snake", text });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-neon-red/40 bg-game-surface p-6 shadow-[0_0_40px_rgba(255,56,100,0.2)] animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-neon-red mb-1">
          Game Over
        </h2>
        {isNewHighScore && (
          <p className="text-center text-yellow-400 text-sm mb-4 flex items-center justify-center gap-1">
            <Trophy className="w-4 h-4" /> New High Score!
          </p>
        )}

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Stat label="Score" value={score} highlight />
          <Stat label="Best" value={highScore} />
          <Stat label="Time" value={formatTime(timeSurvived)} />
          <Stat label="Food" value={foodEaten} />
        </div>

        <GameOverActions
          onRestart={onRestart}
          onMenu={onMenu}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
      <p className="text-xs text-zinc-400">{label}</p>
      <p
        className={`text-xl font-bold tabular-nums ${
          highlight ? "text-neon-green" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function GameOverActions({
  onRestart,
  onMenu,
  onShare,
}: {
  onRestart: () => void;
  onMenu: () => void;
  onShare: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 mt-6">
      <ModalButton onClick={onRestart} variant="primary">
        <RotateCcw className="w-4 h-4" /> Play Again
      </ModalButton>
      <ModalButton onClick={onMenu} variant="secondary">
        <Home className="w-4 h-4" /> Main Menu
      </ModalButton>
      <ModalButton onClick={onShare} variant="secondary">
        <Share2 className="w-4 h-4" /> Share Score
      </ModalButton>
    </div>
  );
}

function ModalButton({
  children,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant: "primary" | "secondary";
}) {
  const base =
    "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-all active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? `${base} bg-neon-green text-black shadow-[0_0_20px_rgba(57,255,20,0.4)] hover:brightness-110`
      : `${base} border border-white/20 bg-white/5 text-white hover:bg-white/10`;

  return (
    <button type="button" className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
