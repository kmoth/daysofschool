export function SummerModePage({ onRevealCountdown }) {
  return (
    <main className="summer-mode" aria-label="School is out for summer">
      <div className="summer-mode-message">
        it is now summer{" "}
        <button
          type="button"
          className="summer-mode-emoji-button"
          aria-label="Open parents countdown"
          onClick={onRevealCountdown}
        >
          🎉
        </button>
      </div>
    </main>
  );
}
