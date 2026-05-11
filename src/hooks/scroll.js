import { CALENDAR_ROW_HEIGHT } from "../calendarMath.js";
import { prefersReducedMotion } from "../ui.js";

const SCROLL_SETTLE_MS = 90;
const SCROLL_SETTLE_MAX_MS = 1800;

function getScrollTop(scrollTarget) {
  return scrollTarget === window ? window.scrollY || window.pageYOffset || 0 : scrollTarget.scrollTop;
}

function getMaxScrollTop(scrollTarget) {
  if (scrollTarget === window) {
    const documentElement = document.documentElement;
    const viewportHeight = window.visualViewport?.height || window.innerHeight || documentElement.clientHeight;
    return Math.max(0, documentElement.scrollHeight - viewportHeight);
  }

  return Math.max(0, scrollTarget.scrollHeight - scrollTarget.clientHeight);
}

export function clampScrollTop(scrollTarget, targetTop) {
  return Math.max(0, Math.min(Math.round(targetTop), getMaxScrollTop(scrollTarget)));
}

export function scrollTargetTo(scrollTarget, targetTop, behavior) {
  if (scrollTarget === window) {
    window.scrollTo({ top: targetTop, behavior });
    return;
  }

  scrollTarget.scrollTo({ top: targetTop, behavior });
}

export function getScrollBehavior(requestId) {
  return requestId && !prefersReducedMotion() ? "smooth" : "auto";
}

export function waitForScrollTop(scrollTarget, targetTop, onSettled) {
  let isCancelled = false;
  let frame = 0;
  let settleTimer = 0;
  let maxTimer = 0;

  const clearTimers = () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(settleTimer);
    window.clearTimeout(maxTimer);
  };

  const finish = () => {
    if (isCancelled) return;
    isCancelled = true;
    clearTimers();
    onSettled();
  };

  const tick = () => {
    if (isCancelled) return;

    const distance = Math.abs(getScrollTop(scrollTarget) - targetTop);
    if (distance <= 1) {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(finish, SCROLL_SETTLE_MS);
      return;
    }

    frame = window.requestAnimationFrame(tick);
  };

  frame = window.requestAnimationFrame(tick);
  maxTimer = window.setTimeout(finish, SCROLL_SETTLE_MAX_MS);

  return () => {
    isCancelled = true;
    clearTimers();
  };
}

export function getDocumentFocusBand() {
  const weekdayElement = document.querySelector(".calendar-weekdays");
  const highlightsElement = document.querySelector(".highlights-panel");
  const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  const top = Math.max(0, Math.round(weekdayElement?.getBoundingClientRect().bottom ?? 0));
  const bottom = Math.min(viewportHeight, Math.round(highlightsElement?.getBoundingClientRect().top ?? viewportHeight));

  if (bottom - top < CALENDAR_ROW_HEIGHT * 2) {
    return { height: viewportHeight, top: 0 };
  }

  return { height: bottom - top, top };
}
