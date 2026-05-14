export const DEFAULT_PALETTE_ID = "classic";

export const PALETTES = [
  {
    id: DEFAULT_PALETTE_ID,
    label: "Classic",
    swatch: ["#ffffff", "#eef1f4", "#ddf6e7", "#0f9f68"],
  },
  {
    id: "playground",
    label: "Playground",
    swatch: ["#fff1a8", "#8be8ff", "#ff8a5b", "#006d77"],
  },
  {
    id: "highlighter",
    label: "Highlighter",
    swatch: ["#f7ff00", "#55f2c4", "#ff4fd8", "#4b14b8"],
  },
  {
    id: "pool-party",
    label: "Pool Party",
    swatch: ["#dffbff", "#00c2ff", "#0066ff", "#ffdd57"],
  },
];

const PALETTE_STORAGE_KEY = "days-of-school-palette";
const PALETTE_IDS = new Set(PALETTES.map((palette) => palette.id));

export function isPaletteId(value) {
  return PALETTE_IDS.has(value);
}

export function getInitialPaletteId() {
  const browserWindow = globalThis.window;
  if (!browserWindow) return DEFAULT_PALETTE_ID;

  try {
    const storedPalette = browserWindow.localStorage?.getItem(PALETTE_STORAGE_KEY);
    if (isPaletteId(storedPalette)) return storedPalette;
  } catch {
    return DEFAULT_PALETTE_ID;
  }

  return DEFAULT_PALETTE_ID;
}

export function savePalettePreference(paletteId) {
  if (!isPaletteId(paletteId)) return;

  const browserWindow = globalThis.window;
  if (!browserWindow) return;

  try {
    browserWindow.localStorage?.setItem(PALETTE_STORAGE_KEY, paletteId);
  } catch {
    // Palette selection should still work when storage is unavailable.
  }
}

export function clearPaletteQueryParam() {
  const browserWindow = globalThis.window;
  if (!browserWindow) return;

  try {
    const url = new browserWindow.URL(browserWindow.location.href);
    if (!url.searchParams.has("palette")) return;

    url.searchParams.delete("palette");
    browserWindow.history.replaceState({}, "", url);
  } catch {
    // Cleaning up the legacy query param is best-effort.
  }
}
