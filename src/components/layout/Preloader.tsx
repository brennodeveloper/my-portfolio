"use client";

import { useEffect, useRef, useState } from "react";

type PreloaderProps = {
  onFinish: () => void;
};

type BarBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type Phase =
  | "loading"
  | "complete"
  | "prepare"
  | "move"
  | "grow"
  | "spread"
  | "cover"
  | "covered"
  | "uncover"
  | "finish";

const TIMING = {
  completePause: 200,
  interfaceExit: 220,
  moveDuration: 400,

  growDuration: 280,
  spreadDuration: 360,
  coverDuration: 460,

  coveredPause: 180,

  uncoverDuration: 460,
  finishDuration: 140,
};

const Preloader = ({ onFinish }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<Phase>("loading");

  const barTrackRef = useRef<HTMLDivElement | null>(null);

  const [barBounds, setBarBounds] = useState<BarBounds | null>(null);

  useEffect(() => {
    const measureBar = () => {
      const bar = barTrackRef.current;

      if (!bar) return;

      const { top, left, width, height } = bar.getBoundingClientRect();

      setBarBounds({ top, left, width, height });
    };

    measureBar();

    const frame = window.requestAnimationFrame(measureBar);

    window.addEventListener("resize", measureBar);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measureBar);
    };
  }, []);

  useEffect(() => {
    if (phase !== "loading") return;

    const interval = window.setInterval(() => {
      setProgress((prev) => {
        const increment = 1 + Math.floor((100 - prev) / 10);

        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => window.clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "loading" && progress === 100) {
      setPhase("complete"); // mudar isso aq dps
    }
  }, [phase, progress]);

  useEffect(() => {
    if (phase !== "complete") return;

    const timer = window.setTimeout(() => {
      setPhase("prepare");
    }, TIMING.completePause);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "prepare") return;

    const timer = window.setTimeout(() => {
      setPhase("move");
    }, TIMING.interfaceExit);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "move") return;

    const timer = window.setTimeout(() => {
      setPhase("grow");
    }, TIMING.moveDuration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "grow") return;

    const timer = window.setTimeout(() => {
      setPhase("spread");
    }, TIMING.growDuration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "spread") return;

    const timer = window.setTimeout(() => {
      setPhase("cover");
    }, TIMING.spreadDuration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "cover") return;

    const timer = window.setTimeout(() => {
      setPhase("covered");
    }, TIMING.coverDuration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "covered") return;

    const timer = window.setTimeout(() => {
      setPhase("uncover");
    }, TIMING.coveredPause);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "uncover") return;

    const timer = window.setTimeout(() => {
      setPhase("finish");
    }, TIMING.uncoverDuration);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "finish") return;

    const timer = window.setTimeout(() => {
      onFinish();
    }, TIMING.finishDuration);

    return () => window.clearTimeout(timer);
  }, [phase, onFinish]);

  const hideInterface = phase !== "loading" && phase !== "complete";

  const isUncovering = phase === "uncover" || phase === "finish";

  const isCoverVisible =
    phase !== "loading" && phase !== "complete" && phase !== "finish";

    const getClipPath = () => {
    const barWidth = barBounds?.width ?? 256;
    const barHeight = barBounds?.height ?? 4;

    const centeredBar = `inset(
      calc(50% - ${barHeight / 2}px)
      calc(50% - ${barWidth / 2}px)
      calc(50% - ${barHeight / 2}px)
      calc(50% - ${barWidth / 2}px)
      round 999px
    )`;

    const originalBarPosition = () => {
      if (!barBounds) return centeredBar;

      return `inset(
        ${barBounds.top}px
        calc(100% - ${barBounds.left + barBounds.width}px)
        calc(100% - ${barBounds.top + barBounds.height}px)
        ${barBounds.left}px
        round 999px
      )`;
    };

    if (
      phase === "loading" ||
      phase === "complete" ||
      phase === "prepare"
    ) {
      return originalBarPosition();
    }

    if (phase === "move") {
      return centeredBar;
    }

    if (phase === "grow") {
      const growWidth = barWidth + 64;
      const growHeight = 40;

      return `inset(
        calc(50% - ${growHeight / 2}px)
        calc(50% - ${growWidth / 2}px)
        calc(50% - ${growHeight / 2}px)
        calc(50% - ${growWidth / 2}px)
        round 999px
      )`;
    }

    if (phase === "spread") {
      return "inset(calc(50% - 20px) 0 calc(50% - 20px) 0 round 0)";
    }

    if (phase === "cover" || phase === "covered") {
      return "inset(0 0 0 0 round 0)";
    }

    if (phase === "uncover" || phase === "finish") {
      return "inset(calc(50% - 1px) 0 calc(50% - 1px) 0 round 0)";
    }

    return originalBarPosition();
  };

  const getLayerDuration = () => {
    if (phase === "prepare") return `${TIMING.interfaceExit}ms`;
    if (phase === "move") return `${TIMING.moveDuration}ms`;
    if (phase === "grow") return `${TIMING.growDuration}ms`;
    if (phase === "spread") return `${TIMING.spreadDuration}ms`;
    if (phase === "cover") return `${TIMING.coverDuration}ms`;
    if (phase === "uncover") return `${TIMING.uncoverDuration}ms`;
    if (phase === "finish") return `${TIMING.finishDuration}ms`;

    return "0ms";
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden 
      ${
        isUncovering ? "bg-transparent" : "bg-[#020617]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 z-20 bg-cyan-300"
        style={{
          opacity: isCoverVisible ? 1 : 0,
          clipPath: getClipPath(),
          transitionProperty: "clip-path, opacity",
          transitionDuration: getLayerDuration(),
          transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "clip-path, opacity",
        }}
      />

      <div className={`relative z-30 flex flex-col items-center justify-center transition-opacity duration-200 
        ${
          hideInterface ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="200" height="190" viewBox="0 0 102 98" fill="none" aria-label="Logo Brenno Souza">
            <path stroke="#4DD0E1" strokeWidth="5" d="M2.5 50.897C2.5 110 99 109.5 99 50.897M2.5 50.897c0-17.394 7.003-30.111 17.236-38.119"/>
            <path stroke="#4DD0E1" strokeWidth="5" d="M44.88 2.874C70.582.187 98.544 16.245 99.02 51.302"/>
            <circle cx="25.008" cy="8.517" r="3.244" fill="#4DD0E1" />
            <circle cx="37.174" cy="3.244" r="3.244" fill="#4DD0E1" />
            <path fill="#4DD0E1" d="M44.07 53.533v13.18h12.369c9.733 0 9.936-13.18 0-13.18zM44.07 40.352v-9.125h12.369c6.083 0 6.175 8.798 0 9.125-6.176.328-12.37 0-12.37 0"/>
            <path stroke="#4DD0E1" strokeWidth="2.839" d="M56.439 31.227h-12.37v9.125s6.194.328 12.37 0c6.175-.327 6.083-9.125 0-9.125Zm-12.37 0h12.37m0 22.306h-12.37v13.18h12.37m-12.37-13.18h12.37m-12.37 13.18h12.37m0 0c9.733 0 9.936-13.18 0-13.18"/>
            <path fill="#4DD0E1" stroke="#4DD0E1" d="m46.5 78.5 18 14c25.416-10.743 32.659-21.807 33.5-50L67 28c4.431 6.211 5.104 10.034-2.5 18.5 8.14 3.251 17.083 19.171 0 30-6.46 3.486-10.639 2.809-18 2Z"/>
          </svg>
        </div>

        <div ref={barTrackRef} className="relative h-1 w-64 overflow-hidden rounded-full bg-white/20" >
          <div className="absolute left-0 top-0 h-full bg-cyan-300 transition-[width] duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-white/70">{progress}%</div>
      </div>
    </div>
  );
};

export default Preloader;