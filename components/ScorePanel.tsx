"use client";

import { Trophy, Zap, Apple, Clock } from "lucide-react";
import { formatTime } from "@/lib/score";

interface ScorePanelProps {
  score: number;
  highScore: number;
  level: number;
  foodEaten: number;
  timeSurvived: number;
  compact?: boolean;
}

export function ScorePanel({
  score,
  highScore,
  level,
  foodEaten,
  timeSurvived,
  compact = false,
}: ScorePanelProps) {
  if (compact) {
    return (
      <CompactScorePanel
        score={score}
        highScore={highScore}
        level={level}
        foodEaten={foodEaten}
        timeSurvived={timeSurvived}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 w-full">
      <StatCard icon={<Zap className="w-4 h-4 text-neon-cyan" />} label="Score" value={score} />
      <StatCard icon={<Trophy className="w-4 h-4 text-yellow-400" />} label="Best" value={highScore} />
      <StatCard icon={<Zap className="w-4 h-4 text-purple-400" />} label="Level" value={level} />
      <StatCard icon={<Apple className="w-4 h-4 text-neon-red" />} label="Food" value={foodEaten} />
      <StatCard
        icon={<Clock className="w-4 h-4 text-neon-green" />}
        label="Time"
        value={formatTime(timeSurvived)}
        className="col-span-2 sm:col-span-1"
      />
    </div>
  );
}

function CompactScorePanel({
  score,
  highScore,
  level,
  foodEaten,
  timeSurvived,
}: Omit<ScorePanelProps, "compact">) {
  return (
    <div className="grid grid-cols-5 gap-1 w-full">
      <CompactStat label="Score" value={score} accent="text-neon-cyan" />
      <CompactStat label="Best" value={highScore} accent="text-yellow-400" />
      <CompactStat label="Lvl" value={level} accent="text-purple-400" />
      <CompactStat label="Food" value={foodEaten} accent="text-neon-red" />
      <CompactStat label="Time" value={formatTime(timeSurvived)} accent="text-neon-green" />
    </div>
  );
}

function CompactStat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-md border border-white/10 bg-white/5 px-1 py-1">
      <span className="text-[9px] text-zinc-500 uppercase">{label}</span>
      <span className={`text-sm font-bold tabular-nums ${accent}`}>{value}</span>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 ${className}`}
    >
      <div className="flex items-center gap-1 text-xs text-zinc-400">
        {icon}
        <span>{label}</span>
      </div>
      <span className="text-lg font-bold text-white tabular-nums">{value}</span>
    </div>
  );
}
