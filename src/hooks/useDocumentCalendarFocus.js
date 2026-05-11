import { useLayoutEffect, useRef } from "react";
import { clampScrollTop, getDocumentFocusBand, getScrollBehavior, scrollTargetTo, waitForScrollTop } from "./scroll.js";

export function useDocumentCalendarFocus(focusRequestId, focusDay, layoutKey, onFocusSettled) {
  const lastFocusKeyRef = useRef("");

  useLayoutEffect(() => {
    if (!focusDay || layoutKey === null || layoutKey === undefined) return undefined;

    const focusKey = `${focusRequestId}:${focusDay}:${layoutKey ?? ""}`;
    if (lastFocusKeyRef.current === focusKey) return undefined;
    lastFocusKeyRef.current = focusKey;

    let cancelScrollWait = null;
    const frame = window.requestAnimationFrame(() => {
      const element = document.querySelector(`[data-date="${focusDay}"]`);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const focusBand = getDocumentFocusBand();
      const targetOffset =
        window.scrollY + rect.top - focusBand.top - Math.max(0, (focusBand.height - rect.height) / 2);
      const targetTop = clampScrollTop(window, targetOffset);

      scrollTargetTo(window, targetTop, getScrollBehavior(focusRequestId));
      cancelScrollWait = waitForScrollTop(window, targetTop, () => {
        onFocusSettled?.(focusDay, focusRequestId);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      cancelScrollWait?.();
    };
  }, [focusDay, focusRequestId, layoutKey, onFocusSettled]);
}
