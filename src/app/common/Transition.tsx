"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
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
        className={cn("origin-bottom", isTransitioning && "max-h-dvh overflow-hidden relative")}
        initial={{ filter: "blur(4px)" }}
        animate={{
          filter: isTransitioning ? "brightness(50%) blur(4px)" : "brightness(100%) blur(0px)",
          scale: isTransitioning ? 0.95 : 1,
        }}
        transition={{ ease: "easeOut", duration: isTransitioning ? 0.3 : 0 }}
      >
        {children}
      </motion.div>
      {/* transition */}
      <div className="fixed inset-0 z-[999] overflow-hidden pointer-events-none">
        {isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-slate-500 size-full"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
            onAnimationComplete={handleTransitionRoute}
          />
        )}
        {!isTransitioning && (
          <motion.div
            className="absolute inset-0 bg-slate-500 size-full"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          />
        )}
      </div>
    </TransitionContext.Provider>
  );
};

export default Transition;
