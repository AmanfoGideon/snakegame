"use client";

import { useEffect, useState } from "react";
import { Share, X } from "lucide-react";

export function IOSInstallHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone ===
          true);
    const dismissed =
      localStorage.getItem("snake-ios-install-dismissed") === "true";

    if (isIOS && !isStandalone && !dismissed) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] pointer-events-none">
      <div className="mx-auto max-w-md pointer-events-auto rounded-xl border border-neon-cyan/30 bg-game-surface/95 backdrop-blur-md p-3 shadow-lg">
        <IOSHintContent onDismiss={() => {
          localStorage.setItem("snake-ios-install-dismissed", "true");
          setShow(false);
        }} />
      </div>
    </div>
  );
}

function IOSHintContent({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-2">
      <Share className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
      <div className="flex-1 text-xs text-zinc-300">
        <p className="font-semibold text-white mb-1">Install on iPhone</p>
        <p>
          Tap <strong className="text-white">Share</strong> then{" "}
          <strong className="text-white">Add to Home Screen</strong> to play
          offline like an app.
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="p-1 text-zinc-500 touch-manipulation"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
