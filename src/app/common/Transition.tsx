"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "./lib/utils";

type TransitionProps = {
  children: React.ReactNode;
};

type TransitionContext = {
  handleRouteChange: (path?: string) => void;
};

const TransitionContext = React.createContext({} as TransitionContext);

export const useTransition = () => {
  const context = React.useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
};

const pageContainerVariants: Variants = {
  initial: { filter: "blur(4px)" },
  animate: { filter: "brightness(50%) blur(4px)", scale: 0.95 },
  finish: { filter: "brightness(100%) blur(0px)", scale: 1 },
};

const SheetInVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: "0%" },
};

const SheetOutVariants: Variants = {
  initial: { y: "0%" },
  animate: { y: "-100%" },
};

const Transition = ({ children }: TransitionProps) => {
  const router = useRouter();
  const handleRouteChange = (path = "/") => {
    if (isTransitioning) {
      return;
    }
    setTransitioning(true);
    setPath(path);
  };

  const handleTransitionRoute = () => {
    setTransitioning(false);
    router.push(path);
  };

  const [isTransitioning, setTransitioning] = useState(false);
  const [path, setPath] = useState("/");

  return (
    <TransitionContext.Provider value={{ handleRouteChange }}>
      <motion.div
        className={cn(
          "origin-bottom w-dvw overflow-x-hidden relative",
          isTransitioning && "overflow-hidden h-dvh relative"
        )}
        initial="initial"
        animate={isTransitioning ? "animate" : "finish"}
        transition={{ ease: "easeOut", duration: isTransitioning ? 0.3 : 0 }}
        variants={pageContainerVariants}
      >
        {children}
      </motion.div>
      {/* transition */}
      <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none">
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-slate-500 size-full"
            initial="initial"
            animate="animate"
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
            variants={SheetInVariants}
            onAnimationComplete={handleTransitionRoute}
          />
        )}
        {!isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-slate-500 size-full"
            initial="initial"
            animate="animate"
            transition={{ ease: "easeOut", duration: 0.5 }}
            variants={SheetOutVariants}
          />
        )}
      </div>
    </TransitionContext.Provider>
  );
};

export default Transition;
