import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getDaysUntilDate } from "../calendarMath.js";
import { FOCUS_SOURCE_CALENDAR, FOCUS_SOURCE_LIST, FOCUS_SOURCE_SHORTCUT } from "../focus.js";
import { formatDayOff, futureDatedItems, getDayOffType } from "../schedule.js";
import { classNames } from "../ui.js";
import { useAttentionPulse } from "../hooks/useAttentionPulse.js";
import { clampScrollTop, getScrollBehavior, scrollTargetTo, waitForScrollTop } from "../hooks/scroll.js";
import { PaletteSwitcher } from "./PaletteSwitcher.jsx";

const GITHUB_REPO_URL = "https://github.com/kmoth/daysofschool";

function GearIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M12 8.1a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Z" />
      <path d="M19.4 15a1.9 1.9 0 0 0 .38 2.1l.07.07a2.05 2.05 0 0 1-2.9 2.9l-.07-.07a1.9 1.9 0 0 0-2.1-.38 1.9 1.9 0 0 0-1.15 1.74v.2a2.05 2.05 0 0 1-4.1 0v-.12a1.9 1.9 0 0 0-1.24-1.76 1.9 1.9 0 0 0-2.1.38l-.07.07a2.05 2.05 0 1 1-2.9-2.9l.07-.07a1.9 1.9 0 0 0 .38-2.1 1.9 1.9 0 0 0-1.74-1.15h-.2a2.05 2.05 0 0 1 0-4.1h.12A1.9 1.9 0 0 0 3.6 8.6a1.9 1.9 0 0 0-.38-2.1l-.07-.07a2.05 2.05 0 1 1 2.9-2.9l.07.07a1.9 1.9 0 0 0 2.1.38h.1a1.9 1.9 0 0 0 1.15-1.74v-.2a2.05 2.05 0 0 1 4.1 0v.12a1.9 1.9 0 0 0 1.15 1.76 1.9 1.9 0 0 0 2.1-.38l.07-.07a2.05 2.05 0 1 1 2.9 2.9l-.07.07a1.9 1.9 0 0 0-.38 2.1v.1a1.9 1.9 0 0 0 1.74 1.15h.2a2.05 2.05 0 0 1 0 4.1h-.12A1.9 1.9 0 0 0 19.4 15Z" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg className="panel-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}

function PanelIconButton({ buttonRef, children, className, label, onClick }) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className={classNames("panel-icon-button", className)}
      aria-label={label}
      title={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function getHighlightItemClass(item) {
  const type = getDayOffType(item);
  return type === "pa" ? "highlight-item-pa" : "highlight-item-general";
}

function CalendarShortcuts({ lastDayISO, onSelectDay, selectedDay, todayISO }) {
  return (
    <div className="calendar-shortcuts" aria-label="Calendar shortcuts">
      <button
        type="button"
        className={classNames(
          "calendar-shortcut",
          "calendar-shortcut-today",
          selectedDay === todayISO && "calendar-shortcut-selected",
        )}
        aria-pressed={selectedDay === todayISO}
        onClick={() => onSelectDay(todayISO, FOCUS_SOURCE_SHORTCUT)}
      >
        Today
      </button>
      <button
        type="button"
        className={classNames(
          "calendar-shortcut",
          "calendar-shortcut-last",
          selectedDay === lastDayISO && "calendar-shortcut-selected",
        )}
        aria-pressed={selectedDay === lastDayISO}
        onClick={() => onSelectDay(lastDayISO, FOCUS_SOURCE_SHORTCUT)}
      >
        Last day
      </button>
    </div>
  );
}

function useListScrollState(listRef, itemCount) {
  const [scrollState, setScrollState] = useState({ hasOverflow: false, isScrolled: false });

  const updateScrollState = useCallback((element) => {
    const hasOverflow = element.scrollHeight > element.clientHeight + 1;
    const isScrolled = hasOverflow && element.scrollTop > 0;

    setScrollState((current) =>
      current.hasOverflow === hasOverflow && current.isScrolled === isScrolled
        ? current
        : { hasOverflow, isScrolled },
    );
  }, []);

  useEffect(() => {
    const element = listRef.current;
    if (!element) return undefined;

    const update = () => updateScrollState(element);
    update();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }

    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [itemCount, listRef, updateScrollState]);

  return [scrollState, updateScrollState];
}

function HighlightsList({
  emptyMessage = "None left. But summer is real close!",
  focusRequestId,
  focusSource,
  items,
  now,
  onSelectDay,
  selectedDay,
}) {
  const futureItems = useMemo(() => futureDatedItems(items, now), [items, now]);
  const listRef = useRef(null);
  const [attentionDay, triggerAttentionPulse] = useAttentionPulse();
  const [scrollState, updateScrollState] = useListScrollState(listRef, futureItems.length);

  useLayoutEffect(() => {
    if (!selectedDay || focusSource !== FOCUS_SOURCE_CALENDAR) return undefined;

    const element = listRef.current;
    const target = element?.querySelector(`[data-highlight-date="${selectedDay}"]`);
    if (!element || !target) return undefined;

    const elementRect = element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetOffset =
      element.scrollTop + targetRect.top - elementRect.top - Math.max(0, (element.clientHeight - targetRect.height) / 2);
    const targetTop = clampScrollTop(element, targetOffset);

    scrollTargetTo(element, targetTop, getScrollBehavior(focusRequestId));
    updateScrollState(element);

    return waitForScrollTop(element, targetTop, () => {
      updateScrollState(element);
      triggerAttentionPulse(selectedDay);
    });
  }, [focusRequestId, focusSource, futureItems.length, selectedDay, triggerAttentionPulse, updateScrollState]);

  const listClassName = classNames(
    "highlights-list",
    scrollState.hasOverflow && "highlights-list-scrollable",
    scrollState.isScrolled && "highlights-list-scrolled",
  );

  if (!futureItems.length) {
    return (
      <ul ref={listRef} className={listClassName} onScroll={(event) => updateScrollState(event.currentTarget)}>
        <li className="highlights-list-empty">{emptyMessage}</li>
      </ul>
    );
  }

  return (
    <ul ref={listRef} className={listClassName} onScroll={(event) => updateScrollState(event.currentTarget)}>
      {futureItems.map((item) => (
        <li key={item.date}>
          <button
            type="button"
            className={classNames(
              "highlight-item",
              "highlight-item-button",
              getHighlightItemClass(item),
              item.date === selectedDay && "highlight-item-selected",
              item.date === attentionDay && "highlight-item-attention",
            )}
            data-highlight-date={item.date}
            aria-pressed={item.date === selectedDay}
            onClick={() => onSelectDay(item.date, FOCUS_SOURCE_LIST)}
          >
            <span className="highlight-item-label">{formatDayOff(item)}</span>
            <span className="highlight-item-count">({getDaysUntilDate(item.date, now)}d)</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

export const HighlightsPanel = memo(function HighlightsPanel({
  emptyMessage,
  focusRequestId,
  focusSource,
  items,
  lastDayISO,
  now,
  onSelectDay,
  onSelectPalette,
  paletteId,
  palettes,
  selectedDay,
  todayISO,
  validSchedule,
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const hasFlippedRef = useRef(false);
  const settingsButtonRef = useRef(null);
  const settingsBackButtonRef = useRef(null);
  const openSettings = useCallback(() => {
    hasFlippedRef.current = true;
    setIsSettingsOpen(true);
  }, []);
  const closeSettings = useCallback(() => {
    hasFlippedRef.current = true;
    setIsSettingsOpen(false);
  }, []);

  useEffect(() => {
    if (!hasFlippedRef.current) return;

    const target = isSettingsOpen ? settingsBackButtonRef.current : settingsButtonRef.current;
    target?.focus({ preventScroll: true });
  }, [isSettingsOpen]);

  return (
    <div className="highlights-panel-frame">
      <aside
        className={classNames("highlights-panel", isSettingsOpen && "highlights-panel-settings-open")}
        aria-label={isSettingsOpen ? "Settings" : "Highlights"}
      >
        <div
          className="highlights-panel-face highlights-panel-front"
          aria-hidden={isSettingsOpen}
          inert={isSettingsOpen ? "" : undefined}
        >
          <HighlightsList
            emptyMessage={emptyMessage}
            focusRequestId={focusRequestId}
            focusSource={focusSource}
            items={items}
            now={now}
            onSelectDay={onSelectDay}
            selectedDay={selectedDay}
          />
          <div className="highlights-panel-actions">
            {validSchedule && (
              <CalendarShortcuts
                lastDayISO={lastDayISO}
                onSelectDay={onSelectDay}
                selectedDay={selectedDay}
                todayISO={todayISO}
              />
            )}
            <PanelIconButton
              buttonRef={settingsButtonRef}
              className="settings-toggle-button"
              label="Settings"
              onClick={openSettings}
            >
              <GearIcon />
            </PanelIconButton>
          </div>
        </div>

        <div
          className="highlights-panel-face highlights-panel-back"
          aria-hidden={!isSettingsOpen}
          inert={!isSettingsOpen ? "" : undefined}
        >
          <div className="settings-panel-heading">
            <PanelIconButton
              buttonRef={settingsBackButtonRef}
              className="settings-back-button"
              label="Back to highlights"
              onClick={closeSettings}
            >
              <BackIcon />
            </PanelIconButton>
          </div>
          <div className="settings-panel-body">
            <section className="settings-section" aria-label="Theme">
              <PaletteSwitcher paletteId={paletteId} palettes={palettes} onSelectPalette={onSelectPalette} />
            </section>
          </div>
          <a className="settings-repo-link" href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
            {GITHUB_REPO_URL}
          </a>
        </div>
      </aside>
    </div>
  );
});
