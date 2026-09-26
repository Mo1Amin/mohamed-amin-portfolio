"use client";

import { useReducedMotion } from "motion/react";
import { useRef, type ComponentType, type ReactNode, type Ref } from "react";
import type { IconHandle } from "./icons";

type Icon = ComponentType<{ ref?: Ref<IconHandle>; size?: number; className?: string }>;

export function useIconMotion() {
  const icon = useRef<IconHandle>(null);
  const reduced = useReducedMotion();

  const play = (move: keyof IconHandle) => () => {
    if (!reduced) icon.current?.[move]();
  };

  return {
    icon,
    handlers: {
      onPointerEnter: play("start"),
      onPointerLeave: play("stop"),
      onFocus: play("start"),
      onBlur: play("stop"),
      onClick: play("press"),
    },
  };
}

interface Props {
  href: string;
  icon: Icon;
  className?: string;
  iconSize?: number;
  rel?: string;
  iconAfter?: boolean;
  children: ReactNode;
}

export function MotionLink({ href, icon: Icon, className, iconSize = 20, rel, iconAfter, children }: Props) {
  const { icon, handlers } = useIconMotion();
  const glyph = <Icon ref={icon} size={iconSize} className="motion-icon" />;

  return (
    <a href={href} className={className} rel={rel} {...handlers}>
      {!iconAfter && glyph}
      {children}
      {iconAfter && glyph}
    </a>
  );
}
