import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../ui.js";

export const ATTENTION_PULSE_MS = 460;

export function useAttentionPulse() {
  const [attentionDay, setAttentionDay] = useState("");
  const animationFrameRef = useRef(0);
  const animationTimerRef = useRef(0);

  const triggerAttentionPulse = useCallback((date) => {
    if (!date || prefersReducedMotion()) return;

    window.cancelAnimationFrame(animationFrameRef.current);
    window.clearTimeout(animationTimerRef.current);
    setAttentionDay("");

    animationFrameRef.current = window.requestAnimationFrame(() => {
      setAttentionDay(date);
      animationTimerRef.current = window.setTimeout(() => setAttentionDay(""), ATTENTION_PULSE_MS);
    });
  }, []);

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(animationFrameRef.current);
      window.clearTimeout(animationTimerRef.current);
    };
  }, []);

  return [attentionDay, triggerAttentionPulse];
}
