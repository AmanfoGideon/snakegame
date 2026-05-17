"use client";

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { Direction } from "@/lib/types";

interface ControlButtonsProps {
  onDirection: (dir: Direction) => void;
  disabled?: boolean;
}

export function ControlButtons({ onDirection, disabled }: ControlButtonsProps) {
  const btnClass =
    "touch-target flex items-center justify-center w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 rounded-2xl border-2 border-neon-green/50 bg-white/10 text-neon-green shadow-[0_0_14px_rgba(57,255,20,0.25)] active:scale-95 active:bg-neon-green/25 transition-transform disabled:opacity-40 disabled:pointer-events-none select-none touch-manipulation";

  const handleDir = (dir: Direction) => (e: React.PointerEvent) => {
    e.preventDefault();
    onDirection(dir);
  };

  return (
    <div
      className="grid grid-cols-3 gap-3 w-full max-w-[min(100%,17rem)] mx-auto"
      role="group"
      aria-label="Directional controls"
    >
      <div />
      <button type="button" className={btnClass} onPointerDown={handleDir("UP")} disabled={disabled} aria-label="Move up">
        <ChevronUp className="w-10 h-10" strokeWidth={2.5} />
      </button>
      <div />
      <button type="button" className={btnClass} onPointerDown={handleDir("LEFT")} disabled={disabled} aria-label="Move left">
        <ChevronLeft className="w-10 h-10" strokeWidth={2.5} />
      </button>
      <div className="flex items-center justify-center">
        <span className="text-[10px] text-zinc-600 uppercase tracking-wider">D-Pad</span>
      </div>
      <button type="button" className={btnClass} onPointerDown={handleDir("RIGHT")} disabled={disabled} aria-label="Move right">
        <ChevronRight className="w-10 h-10" strokeWidth={2.5} />
      </button>
      <div />
      <button type="button" className={btnClass} onPointerDown={handleDir("DOWN")} disabled={disabled} aria-label="Move down">
        <ChevronDown className="w-10 h-10" strokeWidth={2.5} />
      </button>
      <div />
    </div>
  );
}
