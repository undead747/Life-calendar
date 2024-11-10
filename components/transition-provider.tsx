"use client";

import React, { useState, useRef } from "react";
import classNames from "classnames";
import { TransitionContext, Animation } from "@/context/transition-context";

export function TransitionProvider({
  children,
  containerClassName,
}: React.PropsWithChildren<{
  containerClassName: string;
}>) {
  const [className, setClassName] = useState("");
  const animation = useRef<Animation>("slide-left");

  return (
    <TransitionContext.Provider
      value={{
        className,
        setClassName,
        animation,
      }}
    >
      <div className={classNames(className, containerClassName)}>
        {children}
      </div>
    </TransitionContext.Provider>
  );
}