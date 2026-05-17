"use client";

import Link from "next/link";
import { Play, Volume2, VolumeX, Trophy, Settings, Smartphone } from "lucide-react";
import { DIFFICULTY_CONFIG, STORAGE_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { sounds } from "@/lib/sound";
import type { Difficulty, GameSettings } from "@/lib/types";

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: "normal",
  soundEnabled: true,
  theme: "neon",
};

export function HomeScreen() {
  const [settings, setSettings] = useLocalStorage<GameSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS
  );
  const [highScore] = useLocalStorage<number>(STORAGE_KEYS.highScore, 0);

  const setDifficulty = (d: Difficulty) => {
    sounds.click(settings.soundEnabled);
    setSettings((s) => ({ ...s, difficulty: d }));
  };

  const toggleSound = () => {
    setSettings((s) => {
      const next = !s.soundEnabled;
      if (next) sounds.click(true);
      return { ...s, soundEnabled: next };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-4 py-6 gap-6 safe-area-padding scrollable overflow-y-auto">
      <header className="text-center safe-area-top pt-2">
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
          <span className="text-neon-green drop-shadow-[0_0_20px_#39ff14]">
            HEPAGK
          </span>{" "}
          <span className="text-white">snake</span>
        </h1>
        <p className="mt-2 text-zinc-400 text-sm sm:text-base">
          Tap to play — built for mobile
        </p>
      </header>

      <div className="flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2.5 touch-target">
        <Trophy className="w-5 h-5 text-yellow-400 shrink-0" />
        <span className="text-yellow-400 font-semibold tabular-nums">
          High Score: {highScore}
        </span>
      </div>

      <section className="w-full max-w-sm space-y-3">
        <p className="text-sm text-zinc-400 text-center">Select Difficulty</p>
        <DifficultyGrid
          settings={settings}
          setDifficulty={setDifficulty}
        />
      </section>

      <div className="flex flex-col gap-3 w-full max-w-sm safe-area-bottom">
        <Link
          href={`/game?difficulty=${settings.difficulty}`}
          onClick={() => sounds.click(settings.soundEnabled)}
          className="touch-target flex items-center justify-center gap-2 w-full min-h-[56px] py-4 rounded-xl bg-neon-green text-black font-bold text-lg shadow-[0_0_25px_rgba(57,255,20,0.5)] active:scale-[0.98] transition-transform"
        >
          <Play className="w-6 h-6" fill="currentColor" />
          Start Game
        </Link>

        <button
          type="button"
          onClick={toggleSound}
          className="touch-target flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-xl border border-white/20 bg-white/5 text-white active:bg-white/10 transition-colors"
        >
          {settings.soundEnabled ? (
            <>
              <Volume2 className="w-5 h-5 text-neon-green" /> Sound On
            </>
          ) : (
            <>
              <VolumeX className="w-5 h-5 text-zinc-500" /> Sound Off
            </>
          )}
        </button>

        <Link
          href="/settings"
          onClick={() => sounds.click(settings.soundEnabled)}
          className="touch-target flex items-center justify-center gap-2 w-full min-h-[48px] py-3 rounded-xl border border-white/20 bg-white/5 text-zinc-400 active:bg-white/10 active:text-white transition-colors text-sm"
        >
          <Settings className="w-4 h-4" /> Settings
        </Link>
      </div>

      <footer className="text-center text-xs text-zinc-600 max-w-sm pb-4">
        <p className="flex items-center justify-center gap-1.5 mb-2">
          <Smartphone className="w-3.5 h-3.5" />
          Swipe on the board or use the D-pad
        </p>
        <p>Install the app for offline play and fullscreen mode.</p>
        <p className="mt-1 hidden sm:block">Desktop: Arrow keys / WASD · Space to pause</p>
      </footer>
    </div>
  );
}

function DifficultyGrid({
  settings,
  setDifficulty,
}: {
  settings: GameSettings;
  setDifficulty: (d: Difficulty) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => setDifficulty(d)}
          className={`touch-target min-h-[48px] py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
            settings.difficulty === d
              ? "bg-neon-green text-black shadow-[0_0_15px_rgba(57,255,20,0.4)]"
              : "border border-white/20 bg-white/5 text-white active:bg-white/10"
          }`}
        >
          {DIFFICULTY_CONFIG[d].label}
        </button>
      ))}
    </div>
  );
}
