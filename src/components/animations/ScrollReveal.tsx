"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  direction?: "up" | "down" | "left" | "right";
  opacity?: boolean;
  scale?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  triggerOnce = true,
  direction = "up",
  opacity = true,
  scale = false,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: triggerOnce });
  const controls = useAnimation();

  const getVariant = () => {
    const base: Record<string, any> = {
      hidden: {},
      visible: { transition: { delay, duration } },
    };

    if (direction === "up") {
      base.hidden = { opacity: opacity ? 0 : 1, y: 50 };
      base.visible = { opacity: opacity ? 1 : 1, y: 0 };
    } else if (direction === "down") {
      base.hidden = { opacity: opacity ? 0 : 1, y: -50 };
      base.visible = { opacity: opacity ? 1 : 1, y: 0 };
    } else if (direction === "left") {
      base.hidden = { opacity: opacity ? 0 : 1, x: 50 };
      base.visible = { opacity: opacity ? 1 : 1, x: 0 };
    } else if (direction === "right") {
      base.hidden = { opacity: opacity ? 0 : 1, x: -50 };
      base.visible = { opacity: opacity ? 1 : 1, x: 0 };
    }

    if (scale) {
      base.hidden = { ...base.hidden, scale: 0.9 };
      base.visible = { ...base.visible, scale: 1 };
    }

    return base;
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [isInView, controls, triggerOnce]);

  const variants = getVariant();

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Sub-components for common animation patterns
export function FadeIn({ children, delay = 0, duration = 0.5 }: { children: React.ReactNode, delay?: number, duration?: number }) {
  return (
    <ScrollReveal delay={delay} duration={duration} direction="up">
      {children}
    </ScrollReveal>
  );
}

export function SlideIn({ children, direction = "up", delay = 0 }: { children: React.ReactNode, direction?: "up" | "down" | "left" | "right", delay?: number }) {
  return (
    <ScrollReveal direction={direction} delay={delay}>
      {children}
    </ScrollReveal>
  );
}

export function PopIn({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <ScrollReveal delay={delay} scale={true}>
      {children}
    </ScrollReveal>
  );
}
