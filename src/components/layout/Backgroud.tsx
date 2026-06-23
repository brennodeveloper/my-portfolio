"use client";

import { animate, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function Background( ) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const color = useMotionValue("#0f172a");

  useEffect(() => {
    const controls = animate (color, ["#0B1D3A", "#102B5C", "#16254A", "#0B1D3A"],
      {
        ease: "easeInOut",
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
      }
    );

    return () => controls.stop();
  }, [color]);

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const backgroundImage = useMotionTemplate`
    radial-gradient(circle at center, ${color} 0%, #020617 75%)
  `;

  const spotlight = useMotionTemplate`
    radial-gradient(
      400px at ${mouseX}px ${mouseY}px,
      rgba(29, 78, 216, 0.15),
      transparent 80%
    )
  `;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950"
      >
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px]" />

        <motion.div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[110px]"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
        />

        <motion.div
          className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full bg-cyan-500/15 blur-[120px]"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.35 }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_88%)]" />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 transition duration-300"
        style={{ background: spotlight }}
      />
    </>
  );
}