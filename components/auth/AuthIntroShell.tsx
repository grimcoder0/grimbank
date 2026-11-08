"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AuthVisualPanel } from "@/components/auth/AuthVisualPanel";
import { BrandLockup } from "@/components/auth/BrandLockup";

const INTRO_MS = 2800;

// pending: first paint, everything hidden until the layout is measured
// intro:   the animation timeline is running
// static:  reduced motion, final layout shown immediately
type Mode = "pending" | "intro" | "static";

type AuthIntroShellProps = {
  titleId: string;
  label: string;
  children: ReactNode;
};

export function AuthIntroShell({
  titleId,
  label,
  children,
}: AuthIntroShellProps) {
  const [mode, setMode] = useState<Mode>("pending");
  const [introDone, setIntroDone] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number | undefined;

    const frame = window.requestAnimationFrame(() => {
      const logo = logoRef.current;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (!logo || reduced) {
        setMode("static");
        setIntroDone(true);
        return;
      }

      // The logo is still in its final slot here, so measure how far it is
      // from the centre of the viewport.
      const rect = logo.getBoundingClientRect();
      const viewportW = document.documentElement.clientWidth;
      const viewportH = document.documentElement.clientHeight;
      setOffset({
        x: viewportW / 2 - (rect.left + rect.width / 2),
        y: viewportH / 2 - (rect.top + rect.height / 2),
      });
      setMode("intro");

      timer = window.setTimeout(() => setIntroDone(true), INTRO_MS);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const style = {
    "--dx": `${offset.x}px`,
    "--dy": `${offset.y}px`,
  } as CSSProperties;

  return (
    <main
      className="login-shell auth-intro"
      data-mode={mode}
      data-done={introDone}
      style={style}
    >
      <section className="login-panel" aria-labelledby={titleId}>
        <div ref={logoRef} className="intro-logo">
          <BrandLockup />
          <p className="intro-label">{label}</p>
        </div>

        <div className="intro-reveal" inert={mode === "intro" && !introDone}>
          {children}
        </div>
      </section>

      <AuthVisualPanel />
    </main>
  );
}
