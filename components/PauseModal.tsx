"use client";

import { Play, RotateCcw, Home } from "lucide-react";

interface PauseModalProps {
  onResume: () => void;
  onRestart: () => void;
  onMenu: () => void;
}

export function PauseModal({ onResume, onRestart, onMenu }: PauseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-2xl border border-neon-cyan/40 bg-game-surface p-6 shadow-[0_0_40px_rgba(0,255,255,0.15)] animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-neon-cyan mb-6">
          Paused
        </h2>
        <div className="flex flex-col gap-2">
          <PauseButton onClick={onResume} variant="primary">
            <Play className="w-4 h-4" /> Resume
          </PauseButton>
          <PauseButton onClick={onRestart} variant="secondary">
            <RotateCcw className="w-4 h-4" /> Restart
          </PauseButton>
          <PauseButton onClick={onMenu} variant="secondary">
            <Home className="w-4 h-4" /> Main Menu
          </PauseButton>
        </div>
      </div>
    </div>
  );
}

function PauseButton({
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
      ? `${base} bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:brightness-110`
      : `${base} border border-white/20 bg-white/5 text-white hover:bg-white/10`;

  return (
    <button type="button" className={styles} onClick={onClick}>
      {children}
    </button>
  );
}
