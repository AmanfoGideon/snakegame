import { Suspense } from "react";
import { GameScreen } from "@/components/GameScreen";

export default function GamePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-full text-neon-green">
          Loading...
        </div>
      }
    >
      <GameScreen />
    </Suspense>
  );
}
