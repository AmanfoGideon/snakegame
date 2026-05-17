"use client";

import { useEffect } from "react";
import { KEY_TO_DIRECTION } from "@/lib/constants";
import type { Direction } from "@/lib/types";

interface UseKeyboardControlsOptions {
  onDirection: (dir: Direction) => void;
  onPause: () => void;
  enabled: boolean;
}

export function useKeyboardControls({
  onDirection,
  onPause,
  enabled,
}: UseKeyboardControlsOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        onPause();
        return;
      }

      const direction = KEY_TO_DIRECTION[e.key];
      if (direction) {
        e.preventDefault();
        onDirection(direction);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDirection, onPause, enabled]);
}
