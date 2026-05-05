import { lazy, Suspense, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Auralis = lazy(() => import("./auralis"));

/** Matches `use-mobile.ts`: viewport below this width skips WebGL. */
const MOBILE_MAX_PX = 767;

function useAuralisBackgroundActive() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mqNarrow = window.matchMedia(`(max-width: ${MOBILE_MAX_PX}px)`);
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } })
          .connection?.saveData === true;
      setActive(!mqNarrow.matches && !mqReduce.matches && !saveData);
    };

    update();
    mqNarrow.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    return () => {
      mqNarrow.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
    };
  }, []);

  return active;
}

const staticBackdropClass =
  "pointer-events-none fixed inset-0 z-0 h-[100dvh] min-h-svh w-full bg-[#020617]";

export function AuralisSiteBackground() {
  const webGl = useAuralisBackgroundActive();

  return (
    <>
      <div className={staticBackdropClass} aria-hidden />
      {webGl && (
        <Suspense fallback={null}>
          <Auralis
            height="100dvh"
            className={cn(
              "pointer-events-none fixed inset-0 z-0 h-dvh! min-h-svh w-full",
            )}
          />
        </Suspense>
      )}
    </>
  );
}
