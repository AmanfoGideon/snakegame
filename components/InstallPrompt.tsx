"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone ===
          true);
    setIsStandalone(standalone);

    const dismissedBefore =
      localStorage.getItem("snake-install-dismissed") === "true";
    setDismissed(dismissedBefore);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (isStandalone || dismissed || !deferredPrompt) return null;

  const handleInstall = async () => {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("snake-install-dismissed", "true");
    setDismissed(true);
    setDeferredPrompt(null);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="mx-auto max-w-md pointer-events-auto rounded-2xl border border-neon-green/30 bg-game-surface/95 backdrop-blur-md p-4 shadow-[0_0_30px_rgba(57,255,20,0.15)]">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white text-sm">Install HEPAGK snake</p>
            <p className="text-xs text-zinc-400 mt-0.5">
              Add to your home screen for fullscreen play and offline access.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-zinc-500 hover:text-white shrink-0 touch-manipulation"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <button
          type="button"
          onClick={handleInstall}
          className="mt-3 flex w-full items-center justify-center gap-2 py-3 rounded-xl bg-neon-green text-black font-semibold text-sm active:scale-[0.98] transition-transform touch-manipulation min-h-[48px]"
        >
          <Download className="w-4 h-4" />
          Install App
        </button>
      </div>
    </div>
  );
}
