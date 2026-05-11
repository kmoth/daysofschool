import { useLayoutEffect } from "react";

export function useStandaloneDisplayModeClass() {
  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia?.("(display-mode: standalone)");

    const updateDisplayModeClass = () => {
      const isStandalone = Boolean(window.navigator?.standalone || mediaQuery?.matches);
      document.documentElement.classList.toggle("standalone-display", isStandalone);
    };

    updateDisplayModeClass();
    mediaQuery?.addEventListener?.("change", updateDisplayModeClass);
    mediaQuery?.addListener?.(updateDisplayModeClass);

    return () => {
      mediaQuery?.removeEventListener?.("change", updateDisplayModeClass);
      mediaQuery?.removeListener?.(updateDisplayModeClass);
      document.documentElement.classList.remove("standalone-display");
    };
  }, []);
}
