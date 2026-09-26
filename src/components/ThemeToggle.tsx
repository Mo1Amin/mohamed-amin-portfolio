"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./motion/icons";
import { useIconMotion } from "./motion/MotionLink";

type Theme = "light" | "dark";

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  const { icon, handlers } = useIconMotion();

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = theme === "dark" ? toLight : toDark;
  const Icon = theme === "dark" ? SunIcon : MoonIcon;

  return (
    <button
      type="button"
      className="icon-button"
      {...handlers}
      onClick={toggle}
      aria-label={label}
      title={label}
      data-no-ink
    >
      <Icon ref={icon} size={18} />
    </button>
  );
}
