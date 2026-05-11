import { useLayoutEffect, useState } from "react";

export function useHeaderGapCssVar(ref, propertyName, layoutKey) {
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    let animationFrame = 0;
    let resizeTimer = 0;

    const updatePosition = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const configuredGap = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--calendar-header-gap"),
      );
      const gap = Number.isFinite(configuredGap) ? configuredGap : rect.top;
      const nextPosition = Math.round(rect.bottom + gap);

      document.documentElement.style.setProperty(propertyName, `${nextPosition}px`);
      setPosition((currentPosition) => (currentPosition === nextPosition ? currentPosition : nextPosition));
    };

    const schedulePositionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updatePosition);
    };

    const scheduleViewportPositionUpdate = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(schedulePositionUpdate, 140);
    };

    updatePosition();
    window.addEventListener("resize", scheduleViewportPositionUpdate);
    window.visualViewport?.addEventListener("resize", scheduleViewportPositionUpdate);

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedulePositionUpdate);
    if (observer && ref.current) observer.observe(ref.current);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleViewportPositionUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleViewportPositionUpdate);
      observer?.disconnect();
      document.documentElement.style.removeProperty(propertyName);
    };
  }, [layoutKey, propertyName, ref]);

  return position;
}
