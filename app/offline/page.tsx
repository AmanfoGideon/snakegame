import Link from "next/link";
import { WifiOff } from "lucide-react";

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-6 text-center safe-area-padding">
      <WifiOff className="w-16 h-16 text-neon-cyan mb-4" />
      <h1 className="text-2xl font-bold text-white mb-2">You&apos;re offline</h1>
      <p className="text-zinc-400 mb-8 max-w-sm">
        HEPAGK snake works offline once installed. Reconnect to sync, or keep
        playing if you&apos;ve already loaded the game.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-neon-green text-black font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}
