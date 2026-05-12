import { useEffect } from "react";

const SHADOW_TEST_MODES = [
  { id: "shadow", label: "Box shadow" },
  { id: "drop-shadow", label: "Drop shadow" },
  { id: "no-shadow", label: "No shadow" },
  { id: "no-footer", label: "No footer" },
];

const SHADOW_TEST_MODE_IDS = new Set(SHADOW_TEST_MODES.map((mode) => mode.id));

function getShadowTestMode() {
  const mode = new URLSearchParams(window.location.search).get("mode");
  return SHADOW_TEST_MODE_IDS.has(mode) ? mode : "shadow";
}

function getShadowTestHref(mode) {
  return mode === "shadow" ? "/shadow-test" : `/shadow-test?mode=${mode}`;
}

export function ShadowClipTestPage() {
  const mode = getShadowTestMode();
  const showFooter = mode !== "no-footer";
  const shadowMethodText = mode === "drop-shadow" ? "filter: drop-shadow on card" : "box-shadow on card";

  useEffect(() => {
    document.title = "Shadow Clip Test";
  }, []);

  return (
    <main className={`shadow-test-page shadow-test-page-${mode}`}>
      <nav className="shadow-test-controls" aria-label="Shadow test modes">
        {SHADOW_TEST_MODES.map((testMode) => (
          <a
            key={testMode.id}
            className="shadow-test-control"
            href={getShadowTestHref(testMode.id)}
            aria-current={mode === testMode.id ? "page" : undefined}
          >
            {testMode.label}
          </a>
        ))}
      </nav>

      <div className="shadow-test-scroll-field" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <div key={index} className="shadow-test-row" />
        ))}
      </div>

      {showFooter && (
        <div className="shadow-test-panel-frame">
          <section className="shadow-test-panel" aria-label="Bottom anchored shadow test">
            <strong>Bottom shadow test</strong>
            <span>fixed frame; near-toolbar offset; {shadowMethodText}</span>
          </section>
        </div>
      )}
    </main>
  );
}
