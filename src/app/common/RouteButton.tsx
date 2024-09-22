"use client";

import React from "react";
import { useTransition } from "../common/Transition";

const RouteButton = ({ children, path }: { path: string; children: React.ReactNode }) => {
  const { handleRouteChange } = useTransition();
  return (
    <button className="p-4 px-12 border rounded" onClick={() => handleRouteChange(path)}>
      {children}
    </button>
  );
};

export default RouteButton;
