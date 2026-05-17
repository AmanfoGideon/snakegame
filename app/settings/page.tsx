"use client";

import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { DIFFICULTY_CONFIG, STORAGE_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { sounds } from "@/lib/sound";
import type { Difficulty, GameSettings } from "@/lib/types";

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: "normal",
  soundEnabled: true,
  theme: "neon",
};

const THEMES = [
  { id: "neon", label: "Neon Dark", color: "#39ff14" },
  { id: "classic", label: "Classic Green", color: "#22c55e" },
  { id: "cyberpunk", label: "Cyberpunk", color: "#f472b6" },
  { id: "ocean", label: "Ocean", color: "#38bdf8" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<GameSettings>(
    STORAGE_KEYS.settings,
    DEFAULT_SETTINGS
  );

  return (
    <div className="flex flex-col min-h-dvh px-4 py-6 max-w-md mx-auto gap-6 safe-area-padding">
      <SettingsHeader soundEnabled={settings.soundEnabled} />

      <section className="space-y-3">
        <h2 className="text-sm text-zinc-400">Default Difficulty</h2>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => {
                sounds.click(settings.soundEnabled);
                setSettings((s) => ({ ...s, difficulty: d }));
              }}
              className={`touch-target min-h-[48px] py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                settings.difficulty === d
                  ? "bg-neon-green text-black"
                  : "border border-white/20 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              {DIFFICULTY_CONFIG[d].label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm text-zinc-400">Theme</h2>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                sounds.click(settings.soundEnabled);
                setSettings((s) => ({ ...s, theme: t.id }));
              }}
              className={`py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                settings.theme === t.id
                  ? "border-neon-green bg-neon-green/10 text-neon-green"
                  : "border-white/20 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ backgroundColor: t.color }}
              />
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() =>
          setSettings((s) => {
            const next = !s.soundEnabled;
            if (next) sounds.click(true);
            return { ...s, soundEnabled: next };
          })
        }
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
      >
        {settings.soundEnabled ? (
          <>
            <Volume2 className="w-5 h-5 text-neon-green" /> Sound Enabled
          </>
        ) : (
          <>
            <VolumeX className="w-5 h-5 text-zinc-500" /> Sound Disabled
          </>
        )}
      </button>
    </div>
  );
}

function SettingsHeader({ soundEnabled }: { soundEnabled: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/"
        onClick={() => sounds.click(soundEnabled)}
        className="p-2 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
        aria-label="Back to menu"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-2xl font-bold">Settings</h1>
    </div>
  );
}
