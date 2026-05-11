import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getDaysUntilDate } from "../calendarMath.js";
import { FOCUS_SOURCE_CALENDAR, FOCUS_SOURCE_LIST, FOCUS_SOURCE_SHORTCUT } from "../focus.js";
import { formatDayOff, futureDatedItems, getDayOffType } from "../schedule.js";
import { classNames } from "../ui.js";
import { useAttentionPulse } from "../hooks/useAttentionPulse.js";
import { clampScrollTop, getScrollBehavior, scrollTargetTo, waitForScrollTop } from "../hooks/scroll.js";

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
  heading,
  items,
  lastDayISO,
  now,
  onSelectDay,
  selectedDay,
  todayISO,
  validSchedule,
}) {
  return (
    <div className="highlights-panel-frame">
      <aside className="highlights-panel">
        <div className="highlights-panel-heading">
          <h2>{heading}</h2>
          {validSchedule && (
            <CalendarShortcuts
              lastDayISO={lastDayISO}
              onSelectDay={onSelectDay}
              selectedDay={selectedDay}
              todayISO={todayISO}
            />
          )}
        </div>
        <HighlightsList
          emptyMessage={emptyMessage}
          focusRequestId={focusRequestId}
          focusSource={focusSource}
          items={items}
          now={now}
          onSelectDay={onSelectDay}
          selectedDay={selectedDay}
        />
      </aside>
    </div>
  );
});
