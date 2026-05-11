export function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export function prefersReducedMotion() {
  return globalThis.window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
}
