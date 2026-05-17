"use client";

import { useEffect } from "react";

/** Locks page scroll and reduces accidental browser gestures during gameplay. */
export function useMobileGameLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const html = document.documentElement;
    const body = document.body;

    html.classList.add("game-lock");
    body.classList.add("game-lock");

    const preventTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".allow-scroll")) return;
      if (e.touches.length > 1) return;
      const scrollable = target.closest(".scrollable");
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight) {
        return;
      }
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventTouchMove, { passive: false });

    return () => {
      html.classList.remove("game-lock");
      body.classList.remove("game-lock");
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, [active]);
}
