"use client";

import { useCallback, useRef } from "react";
import type { Direction } from "@/lib/types";

const SWIPE_THRESHOLD = 40;

interface UseTouchControlsOptions {
  onDirection: (dir: Direction) => void;
  enabled: boolean;
}

export function useTouchControls({
  onDirection,
  enabled,
}: UseTouchControlsOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled) return;
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    },
    [enabled]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || !touchStart.current) return;

      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
        touchStart.current = null;
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        onDirection(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        onDirection(dy > 0 ? "DOWN" : "UP");
      }

      touchStart.current = null;
    },
    [enabled, onDirection]
  );

  return { onTouchStart, onTouchEnd };
}
