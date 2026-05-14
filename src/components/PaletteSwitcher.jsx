import { classNames } from "../ui.js";

export function PaletteSwitcher({ paletteId, palettes, onSelectPalette }) {
  return (
    <div className="palette-switcher" role="group" aria-label="Color palette">
      {palettes.map((palette) => (
        <button
          key={palette.id}
          type="button"
          className={classNames("palette-option", palette.id === paletteId && "palette-option-selected")}
          style={{
            "--palette-swatch-a": palette.swatch[0],
            "--palette-swatch-b": palette.swatch[1],
            "--palette-swatch-c": palette.swatch[2],
            "--palette-swatch-d": palette.swatch[3],
          }}
          title={palette.label}
          aria-label={palette.label}
          aria-pressed={palette.id === paletteId}
          onClick={() => onSelectPalette(palette.id)}
        >
          <span className="palette-option-swatch" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
