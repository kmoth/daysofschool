import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";
import { SCHOOL_COUNTDOWN_CONFIG } from "../school-config.js";
import {
  addDays,
  formatDayOff,
  formatDuration,
  futureDatedItems,
  getDayOffType,
  getRemainingSecondsYear,
  getRemainingSecondsToday,
  isSchoolDay,
  isValidSchedule,
  normalizeSchedule,
  parseISO,
  toISO,
} from "./schedule.js";

function useNow() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return now;
}

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

const CALENDAR_ROW_HEIGHT = 58;
const CALENDAR_START_PADDING_MONTHS = 2;
const CALENDAR_END_PADDING_MONTHS = 2;
const CALENDAR_WEEK_STARTS_ON = 0;
const SUMMER_VIDEO_EMBED_SRC = "https://www.youtube.com/embed/mBqiC5ox8Bw";
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthLabelFormatter = new Intl.DateTimeFormat(undefined, { month: "short" });
const CONFETTI_DURATION_START_SECONDS = 1.3;
const CONFETTI_DURATION_RANGE_SECONDS = 0.4;
const CONFETTI_DURATION_RANDOM_SEED = 31;
const CONFETTI_PARTICLES = [
  ["#e63946", -136, -76, -34, 258, 220, 0, "8px"],
  ["#f4a261", -102, -114, 28, 318, -180, -0.34, "7px"],
  ["#2a9d8f", -62, -136, -18, 286, 150, -0.62, "9px"],
  ["#457b9d", -18, -148, 42, 336, 260, -0.18, "6px"],
  ["#ffbe0b", 42, -132, -24, 292, -210, -0.48, "8px"],
  ["#8338ec", 88, -104, 30, 312, 190, -0.78, "7px"],
  ["#fb5607", 132, -66, -38, 262, -250, -0.25, "9px"],
  ["#06d6a0", 156, -18, 24, 284, 170, -0.55, "6px"],
  ["#ef476f", 142, 36, -28, 236, 230, -0.9, "8px"],
  ["#118ab2", 104, 78, 32, 244, -160, -0.42, "7px"],
  ["#ffd166", 52, 102, -20, 214, 140, -0.7, "9px"],
  ["#3a86ff", -4, 112, 34, 238, -230, -0.12, "6px"],
  ["#8ac926", -56, 98, -30, 224, 200, -0.85, "8px"],
  ["#ff006e", -108, 68, 26, 248, -140, -0.36, "7px"],
  ["#00b4d8", -148, 18, -22, 272, 240, -0.66, "9px"],
  ["#ffca3a", -162, -24, 36, 288, -190, -0.05, "6px"],
  ["#e76f51", -124, -92, -26, 304, 210, -0.52, "8px"],
  ["#7209b7", -76, -126, 38, 322, -240, -0.73, "7px"],
  ["#43aa8b", -28, -156, -32, 342, 160, -0.22, "9px"],
  ["#f72585", 26, -144, 22, 296, -170, -0.58, "6px"],
  ["#4cc9f0", 76, -118, -36, 318, 250, -0.95, "8px"],
  ["#f77f00", 124, -84, 30, 284, -220, -0.31, "7px"],
  ["#90be6d", 166, -34, -24, 264, 180, -0.64, "9px"],
  ["#9b5de5", 154, 24, 40, 242, -150, -0.44, "6px"],
  ["#00f5d4", 116, 72, -30, 234, 230, -0.81, "8px"],
  ["#f15bb5", 62, 106, 26, 218, -260, -0.27, "7px"],
  ["#fee440", 8, 124, -34, 206, 170, -0.69, "9px"],
  ["#00bbf9", -44, 108, 28, 228, -200, -0.16, "6px"],
  ["#ff595e", -94, 82, -22, 246, 220, -0.76, "8px"],
  ["#1982c4", -144, 42, 34, 268, -180, -0.47, "7px"],
];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function seededRandom(value) {
  const random = Math.sin(value) * 10000;
  return random - Math.floor(random);
}

function getConfettiDurationSeconds(index) {
  return (
    CONFETTI_DURATION_START_SECONDS +
    seededRandom(CONFETTI_DURATION_RANDOM_SEED + index * 11) * CONFETTI_DURATION_RANGE_SECONDS
  );
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function getCalendarMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getCalendarMonths(firstDay, lastDay) {
  const months = [];
  for (let cursor = startOfMonth(firstDay); cursor <= lastDay; cursor = addMonths(cursor, 1)) {
    months.push(new Date(cursor));
  }

  return months;
}

function getDaysInMonth(monthStart) {
  const days = [];
  const lastDate = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  for (let day = 1; day <= lastDate; day += 1) {
    days.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), day));
  }

  return days;
}

function ConfettiBurst({ className }) {
  return (
    <span className={classNames("confetti-burst", className)} aria-hidden="true">
      {CONFETTI_PARTICLES.map(([color, x, y, , fall, rotate, , size], index) => {
        const durationSeconds = getConfettiDurationSeconds(index);
        const duration = `${durationSeconds.toFixed(2)}s`;
        const delay = `${-(durationSeconds * index) / CONFETTI_PARTICLES.length}s`;
        const gravity = Math.max(52, Math.round(fall * 0.22));
        const midX = Math.round(x * 0.5);
        const midY = Math.round(y * 0.5 + gravity * 0.25);
        const endY = y + gravity;
        const midRotate = Math.round(rotate * 0.5);
        const endRotate = rotate + 180;
        return (
          <span
            key={`${color}-${index}`}
            className="confetti-burst-particle"
            style={{
              "--confetti-color": color,
              "--confetti-x": `${x}px`,
              "--confetti-y": `${y}px`,
              "--confetti-mid-x": `${midX}px`,
              "--confetti-mid-y": `${midY}px`,
              "--confetti-end-y": `${endY}px`,
              "--confetti-rotate": `${rotate}deg`,
              "--confetti-mid-rotate": `${midRotate}deg`,
              "--confetti-end-rotate": `${endRotate}deg`,
              "--confetti-delay": delay,
              "--confetti-size": size,
              "--confetti-duration": duration,
            }}
          />
        );
      })}
    </span>
  );
}

function getQueryDayTarget() {
  if (typeof window === "undefined") return null;

  const value = new URLSearchParams(window.location.search).get("day")?.toLowerCase();
  if (value === "last" || value === "summer") return value;
  if (!value || !/^\d+$/.test(value)) return null;

  return Number(value);
}

function getLastSchoolDay(schedule) {
  let lastSchoolDay = null;
  for (let cursor = new Date(schedule.firstDay); cursor <= schedule.lastDay; cursor = addDays(cursor, 1)) {
    if (isSchoolDay(cursor, schedule)) lastSchoolDay = cursor;
  }

  return lastSchoolDay;
}

function getSchoolDayByIndex(schedule, targetIndex) {
  if (!Number.isInteger(targetIndex) || targetIndex < 0) return null;

  let index = 0;
  let lastSchoolDay = null;
  for (let cursor = new Date(schedule.firstDay); cursor <= schedule.lastDay; cursor = addDays(cursor, 1)) {
    if (!isSchoolDay(cursor, schedule)) continue;

    lastSchoolDay = cursor;
    if (index === targetIndex) return cursor;
    index += 1;
  }

  return lastSchoolDay;
}

function getDateAtSchoolTime(date, time) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    time.hours,
    time.minutes,
    0,
    0,
  );
}

function getDateAtClock(date, clock) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    clock.getHours(),
    clock.getMinutes(),
    clock.getSeconds(),
    clock.getMilliseconds(),
  );
}

function getSchoolYearEndDate(schedule) {
  return getDateAtSchoolTime(schedule.lastDay, schedule.endTime);
}

function hasExceededSchoolYear(now, schedule) {
  return now >= getSchoolYearEndDate(schedule);
}

function getLastSchoolDayTestNow(schedule, clock) {
  const schoolDay = getLastSchoolDay(schedule);
  if (!schoolDay) return null;

  const now = getDateAtClock(schoolDay, clock);
  if (now >= getDateAtSchoolTime(schoolDay, schedule.endTime)) {
    return getDateAtSchoolTime(schoolDay, schedule.startTime);
  }

  return now;
}

function getTestNowFromQuery(schedule, clock) {
  const dayTarget = getQueryDayTarget();
  if (dayTarget === null) return null;

  if (dayTarget === "summer") {
    const summerDay = addDays(schedule.lastDay, 1);
    return getDateAtClock(summerDay, clock);
  }

  if (dayTarget === "last") return getLastSchoolDayTestNow(schedule, clock);

  const schoolDay = getSchoolDayByIndex(schedule, dayTarget);
  if (!schoolDay) return null;

  return getDateAtClock(schoolDay, clock);
}

function useStandaloneDisplayModeClass() {
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

function getDocumentFocusBand() {
  const weekdayElement = document.querySelector(".calendar-weekdays-fixed");
  const settingsElement = document.querySelector(".settings-panel");
  const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  const top = Math.max(0, Math.round(weekdayElement?.getBoundingClientRect().bottom ?? 0));
  const bottom = Math.min(viewportHeight, Math.round(settingsElement?.getBoundingClientRect().top ?? viewportHeight));

  if (bottom - top < CALENDAR_ROW_HEIGHT * 2) {
    return { height: viewportHeight, top: 0 };
  }

  return { height: bottom - top, top };
}

function useDocumentCalendarFocus(focusRequestId, focusDay, layoutKey) {
  const lastFocusKeyRef = useRef("");

  useLayoutEffect(() => {
    if (!focusDay || layoutKey == null) return;

    const focusKey = `${focusRequestId}:${focusDay}:${layoutKey ?? ""}`;
    if (lastFocusKeyRef.current === focusKey) return;
    lastFocusKeyRef.current = focusKey;

    const frame = window.requestAnimationFrame(() => {
      const element = document.querySelector(`[data-date="${focusDay}"]`);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const focusBand = getDocumentFocusBand();
      const targetOffset =
        window.scrollY + rect.top - focusBand.top - Math.max(0, (focusBand.height - rect.height) / 2);
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

      window.scrollTo({
        top: Math.max(0, Math.round(targetOffset)),
        behavior: focusRequestId && !prefersReducedMotion ? "smooth" : "auto",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [focusDay, focusRequestId, layoutKey]);
}

function useHeaderGapCssVar(ref, propertyName) {
  const [position, setPosition] = useState(null);

  useLayoutEffect(() => {
    let animationFrame = 0;
    let resizeTimer = 0;

    const updatePosition = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const configuredGap = Number.parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue("--calendar-header-gap"),
      );
      const gap = Number.isFinite(configuredGap) ? configuredGap : rect.top;
      const nextPosition = Math.round(rect.bottom + gap);
      document.documentElement.style.setProperty(propertyName, `${nextPosition}px`);
      setPosition((currentPosition) => (currentPosition === nextPosition ? currentPosition : nextPosition));
    };

    const schedulePositionUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updatePosition);
    };

    const scheduleViewportPositionUpdate = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(schedulePositionUpdate, 140);
    };

    updatePosition();
    window.addEventListener("resize", scheduleViewportPositionUpdate);
    window.visualViewport?.addEventListener("resize", scheduleViewportPositionUpdate);

    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedulePositionUpdate);
    if (observer && ref.current) observer.observe(ref.current);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", scheduleViewportPositionUpdate);
      window.visualViewport?.removeEventListener("resize", scheduleViewportPositionUpdate);
      observer?.disconnect();
      document.documentElement.style.removeProperty(propertyName);
    };
  }, [propertyName, ref]);

  return position;
}

function getDayOffClass(item) {
  const type = getDayOffType(item);
  return type === "pa" ? "day-off-pa" : "day-off-general";
}

function getCalendarDayOrdinal(date) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);
}

function getDaysUntilDayOff(dateValue, now) {
  const date = parseISO(dateValue);
  if (!date) return null;

  return Math.max(0, getCalendarDayOrdinal(date) - getCalendarDayOrdinal(now));
}

function DayFocusShortcuts({ lastDayISO, onSelectDay, selectedDay, todayISO }) {
  return (
    <div className="day-focus-shortcuts" aria-label="Calendar shortcuts">
      <button
        type="button"
        className={classNames(
          "day-focus-shortcut",
          "day-focus-shortcut-today",
          selectedDay === todayISO && "day-focus-shortcut-selected",
        )}
        aria-pressed={selectedDay === todayISO}
        onClick={() => onSelectDay(todayISO)}
      >
        Today
      </button>
      <button
        type="button"
        className={classNames(
          "day-focus-shortcut",
          "day-focus-shortcut-last",
          selectedDay === lastDayISO && "day-focus-shortcut-selected",
        )}
        aria-pressed={selectedDay === lastDayISO}
        onClick={() => onSelectDay(lastDayISO)}
      >
        Last day
      </button>
    </div>
  );
}

function DaysOffList({ items, now, onSelectDay, selectedDay }) {
  const futureItems = useMemo(() => futureDatedItems(items, now), [items, now]);
  const listRef = useRef(null);
  const [scrollState, setScrollState] = useState({ hasOverflow: false, isScrolled: false });

  const updateScrollState = (element) => {
    const hasOverflow = element.scrollHeight > element.clientHeight + 1;
    const isScrolled = hasOverflow && element.scrollTop > 0;

    setScrollState((current) =>
      current.hasOverflow === hasOverflow && current.isScrolled === isScrolled
        ? current
        : { hasOverflow, isScrolled },
    );
  };

  const handleScroll = (event) => {
    updateScrollState(event.currentTarget);
  };

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
  }, [futureItems.length]);

  const listClassName = classNames(
    "date-list",
    scrollState.hasOverflow && "date-list-scrollable",
    scrollState.isScrolled && "date-list-scrolled",
  );

  if (!futureItems.length) {
    return (
      <ul ref={listRef} className={listClassName} onScroll={handleScroll}>
        <li className="date-list-empty">None left. But summer is real close!</li>
      </ul>
    );
  }

  return (
    <ul ref={listRef} className={listClassName} onScroll={handleScroll}>
      {futureItems.map((item) => (
        <li key={item.date}>
          <button
            type="button"
            className={classNames(
              "day-off-item",
              "day-off-button",
              getDayOffClass(item),
              item.date === selectedDay && "day-off-item-selected",
            )}
            aria-pressed={item.date === selectedDay}
            onClick={() => onSelectDay(item.date)}
          >
            <span className="day-off-item-label">{formatDayOff(item)}</span>
            <span className="day-off-item-count">({getDaysUntilDayOff(item.date, now)}d)</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function getSelectedOutlineClass({ isDayOff, isLastSchoolDay, isSelectedDay, isToday }) {
  if (!isSelectedDay) return "";
  if (isLastSchoolDay) return "calendar-day-outline-selected-last";
  if (isToday) return "calendar-day-outline-selected-today";
  if (isDayOff) return "calendar-day-outline-selected-day-off";
  return "calendar-day-outline-selected-school";
}

function getMonthLabel(date, fallback) {
  return date instanceof Date ? monthLabelFormatter.format(date) : fallback;
}

function getCalendarDayTypeClass(date, schedule) {
  const dayOff = schedule.allDaysOff.get(date);
  if (dayOff) return classNames("day-off", getDayOffType(dayOff) === "pa" && "day-off-pa");

  const parsedDate = parseISO(date);
  return parsedDate && isSchoolDay(parsedDate, schedule) ? "school-day" : "";
}

function startOfPaddedCalendar(date) {
  if (!(date instanceof Date)) return date;
  return new Date(date.getFullYear(), date.getMonth() - CALENDAR_START_PADDING_MONTHS, 1);
}

function endOfPaddedCalendar(date) {
  if (!(date instanceof Date)) return date;
  return new Date(date.getFullYear(), date.getMonth() + CALENDAR_END_PADDING_MONTHS + 1, 0);
}

function CalendarDay({
  currentDayHasNoSchoolLeft,
  date,
  lastDayISO,
  onSelectDay,
  schedule,
  selectedDay,
  todayISO,
}) {
  const parsedDate = parseISO(date);
  const day = parsedDate?.getDate() ?? "";
  const dayTypeClass = getCalendarDayTypeClass(date, schedule);
  const isCurrentDay = date === todayISO;
  const isSelectedDay = date === selectedDay;
  const isDayOff = schedule.allDaysOff.has(date);
  const isSchoolDate = Boolean(parsedDate && isSchoolDay(parsedDate, schedule));
  const isDisabled = !isSchoolDate && !isDayOff;
  const shouldUsePassedMark = isSchoolDate || isDayOff;
  const isPastMarkedDay = shouldUsePassedMark && (date < todayISO || (isCurrentDay && currentDayHasNoSchoolLeft));
  const isLastSchoolDay = date === lastDayISO;
  const isSelectable = isDayOff || isLastSchoolDay;
  const isCurrentLastSchoolDay = isCurrentDay && isLastSchoolDay;
  const selectedOutlineClass = getSelectedOutlineClass({
    isDayOff,
    isLastSchoolDay,
    isSelectedDay,
    isToday: isCurrentDay,
  });

  return (
    <li
      className={classNames(
        "Cal__Day__root",
        "Cal__Day-module__root",
        isCurrentDay && "Cal__Day__today",
        isCurrentDay && "Cal__Day-module__today",
        isDisabled ? "Cal__Day__disabled" : "Cal__Day__enabled",
        isDisabled ? "Cal__Day-module__disabled" : "Cal__Day-module__enabled",
        isSelectable && "calendar-day-selectable",
        isLastSchoolDay && "calendar-day-last-school-day",
      )}
      aria-current={isCurrentDay ? "date" : undefined}
      aria-label={date}
      data-date={date}
    >
      <span className="calendar-month-fill" aria-hidden="true" />
      {isCurrentLastSchoolDay && <span className="calendar-last-day-sunburst" aria-hidden="true" />}
      {dayTypeClass && (
        <span
          className={classNames(
            "calendar-day-fill",
            dayTypeClass,
            isLastSchoolDay && "last-school-day",
            isCurrentLastSchoolDay && "calendar-last-day-pulse",
          )}
          aria-hidden="true"
        />
      )}
      {isSelectedDay && (
        <span
          className={classNames(
            "calendar-day-outline",
            selectedOutlineClass,
            isCurrentLastSchoolDay && "calendar-last-day-pulse",
          )}
          aria-hidden="true"
        />
      )}
      {isPastMarkedDay && (
        <span className="calendar-day-passed-mark" aria-hidden="true">
          <svg className="calendar-day-passed-mark-lines" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <line x1="4" y1="4" x2="96" y2="96" />
            <line x1="96" y1="4" x2="4" y2="96" />
          </svg>
        </span>
      )}
      {day === 1 && (
        <span className="Cal__Day__month Cal__Day-module__month calendar-month-label">
          {getMonthLabel(parsedDate)}
        </span>
      )}
      {isLastSchoolDay && <ConfettiBurst className="calendar-last-day-confetti" />}
      <span
        className={classNames(
          "calendar-day-number",
          isCurrentDay && "calendar-day-number-current",
          isCurrentLastSchoolDay && "calendar-last-day-pulse",
        )}
      >
        {day}
      </span>
      {isSelectable && (
        <button
          type="button"
          className="calendar-day-select-button"
          aria-label={`Select ${date}`}
          aria-pressed={isSelectedDay}
          onClick={() => onSelectDay(date)}
        />
      )}
    </li>
  );
}

function CalendarWeekdays() {
  return (
    <ol className="calendar-weekdays-fixed" aria-hidden="true">
      {WEEKDAY_LABELS.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ol>
  );
}

function CalendarMonth({
  currentDayHasNoSchoolLeft,
  lastDayISO,
  monthStart,
  onSelectDay,
  schedule,
  selectedDay,
  todayISO,
}) {
  const days = getDaysInMonth(monthStart);
  const leadingBlankDays = (monthStart.getDay() - CALENDAR_WEEK_STARTS_ON + 7) % 7;

  return (
    <section
      className={classNames("calendar-month", leadingBlankDays === 0 && "calendar-month-starts-on-week-start")}
      aria-label={`${monthLabelFormatter.format(monthStart)} ${monthStart.getFullYear()}`}
    >
      <ol className="calendar-month-grid">
        {Array.from({ length: leadingBlankDays }).map((_, index) => (
          <li key={`blank-${index}`} className="calendar-day-spacer" aria-hidden="true" />
        ))}
        {days.map((day) => {
          const iso = toISO(day);
          return (
            <CalendarDay
              key={iso}
              currentDayHasNoSchoolLeft={currentDayHasNoSchoolLeft}
              date={iso}
              lastDayISO={lastDayISO}
              onSelectDay={onSelectDay}
              schedule={schedule}
              selectedDay={selectedDay}
              todayISO={todayISO}
            />
          );
        })}
      </ol>
    </section>
  );
}

function CalendarMonthList({
  currentDayHasNoSchoolLeft,
  lastDayISO,
  months,
  onSelectDay,
  schedule,
  selectedDay,
  todayISO,
}) {
  return (
    <div className="calendar-month-list">
      {months.map((monthStart) => (
        <CalendarMonth
          key={getCalendarMonthKey(monthStart)}
          currentDayHasNoSchoolLeft={currentDayHasNoSchoolLeft}
          lastDayISO={lastDayISO}
          monthStart={monthStart}
          onSelectDay={onSelectDay}
          schedule={schedule}
          selectedDay={selectedDay}
          todayISO={todayISO}
        />
      ))}
    </div>
  );
}

function SchoolCalendar({ calendarWeekdayTop, focusRequestId, lastDayISO, onSelectDay, schedule, now, selectedDay }) {
  const currentDayHasNoSchoolLeft = getRemainingSecondsToday(now, schedule) <= 0;
  const calendarFirstDay = useMemo(() => startOfPaddedCalendar(schedule.firstDay), [schedule.firstDay]);
  const calendarLastDay = useMemo(() => endOfPaddedCalendar(schedule.lastDay), [schedule.lastDay]);
  const calendarMonths = useMemo(
    () => getCalendarMonths(calendarFirstDay, calendarLastDay),
    [calendarFirstDay, calendarLastDay],
  );
  const calendarYear = now.getFullYear();
  const calendarMonth = now.getMonth();
  const calendarDate = now.getDate();
  const calendarToday = useMemo(() => new Date(calendarYear, calendarMonth, calendarDate), [calendarYear, calendarMonth, calendarDate]);
  const todayISO = useMemo(() => toISO(calendarToday), [calendarToday]);
  const focusedDayISO = selectedDay || todayISO;
  useDocumentCalendarFocus(focusRequestId, focusedDayISO, calendarWeekdayTop);

  return (
    <>
      <CalendarWeekdays />
      <div className="react-calendar-shell" aria-label="Calendar">
        <CalendarMonthList
          currentDayHasNoSchoolLeft={currentDayHasNoSchoolLeft}
          lastDayISO={lastDayISO}
          months={calendarMonths}
          onSelectDay={onSelectDay}
          schedule={schedule}
          selectedDay={selectedDay}
          todayISO={todayISO}
        />
      </div>
    </>
  );
}

function SummerModePage() {
  return (
    <main className="summer-mode" aria-label="School is out for summer">
      it is now summer 🎉
      {/* <iframe
        className="summer-video"
        src={SUMMER_VIDEO_EMBED_SRC}
        title="Alice Cooper - School's Out"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      /> */}
    </main>
  );
}

function App() {
  useStandaloneDisplayModeClass();
  const realNow = useNow();
  const countdownHeaderRef = useRef(null);
  const [countdownUnit, setCountdownUnit] = useState("days");
  const schedule = useMemo(() => normalizeSchedule(SCHOOL_COUNTDOWN_CONFIG), []);
  const validSchedule = isValidSchedule(schedule);
  const now = useMemo(() => {
    if (!validSchedule) return realNow;
    return getTestNowFromQuery(schedule, realNow) || realNow;
  }, [realNow, schedule, validSchedule]);
  const isSummerMode = validSchedule && hasExceededSchoolYear(now, schedule);
  const remainingSecondsYear = validSchedule ? getRemainingSecondsYear(now, schedule) : 0;
  const remainingSecondsToday = validSchedule ? getRemainingSecondsToday(now, schedule) : 0;
  const remainingSchoolDays = validSchedule ? Math.ceil(remainingSecondsYear / schedule.dayLengthSeconds) : 0;
  const remainingSchoolWeeks = validSchedule
    ? Math.ceil(remainingSchoolDays / Math.max(1, schedule.weekdays.size))
    : 0;
  const isOneSchoolDayLeft = remainingSchoolDays === 1;
  const showWeeks = countdownUnit === "weeks" && !isOneSchoolDayLeft;
  const headlineText =
    isOneSchoolDayLeft
      ? "LAST DAY OF SCHOOL OMG!1!!"
      : showWeeks
        ? `${remainingSchoolWeeks} ${remainingSchoolWeeks === 1 ? "week" : "weeks"} of school left`
        : `${remainingSchoolDays} ${remainingSchoolDays === 1 ? "day" : "days"} of school left`;
  const todayCountdown = remainingSecondsToday > 0 ? `${formatDuration(remainingSecondsToday)} left today` : "No school left today";
  const todayISO = toISO(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
  const [focusedDayOff, setFocusedDayOff] = useState(() => ({ date: todayISO, requestId: 0 }));
  const lastDayISO = validSchedule ? toISO(getLastSchoolDay(schedule) || schedule.lastDay) : "";
  useEffect(() => {
    document.title = isSummerMode
      ? "School's Out for Summer"
      : validSchedule
      ? headlineText
      : "School Days Left";
  }, [headlineText, isSummerMode, validSchedule]);
  const focusDayOff = (date) => {
    setFocusedDayOff((current) => ({
      date,
      requestId: current.requestId + 1,
    }));
  };
  const toggleCountdownUnit = () => {
    if (isOneSchoolDayLeft) return;
    setCountdownUnit((current) => (current === "days" ? "weeks" : "days"));
  };
  const calendarWeekdayTop = useHeaderGapCssVar(countdownHeaderRef, "--calendar-weekday-top");

  if (isSummerMode) {
    return <SummerModePage />;
  }

  return (
    <main className="app-shell">
      {validSchedule && <div className="calendar-top-blur" aria-hidden="true" />}

      <header className="countdown-header" ref={countdownHeaderRef} aria-labelledby="app-title">
        <h1 id="app-title">
          <button
            type="button"
            className={classNames(
              "countdown-title-toggle",
              isOneSchoolDayLeft && !showWeeks && "countdown-title-final-day",
            )}
            aria-label={
              isOneSchoolDayLeft
                ? headlineText
                : `${headlineText}. Show ${showWeeks ? "days" : "weeks"} of school left`
            }
            disabled={isOneSchoolDayLeft}
            onClick={toggleCountdownUnit}
          >
            {isOneSchoolDayLeft && !showWeeks ? (
              <>
                <span className="countdown-title-stroke" aria-hidden="true">
                  {headlineText}
                </span>
                <span className="countdown-title-fill" aria-hidden="true">
                  {headlineText}
                </span>
              </>
            ) : (
              headlineText
            )}
          </button>
        </h1>
        <p className="precise-countdown">
          {validSchedule ? todayCountdown : "No school"}
        </p>
      </header>

      <div className="settings-panel-frame">
        <aside className="settings-panel">
          <div className="settings-panel-heading">
            <h2>Days off</h2>
            {validSchedule && (
              <DayFocusShortcuts
                lastDayISO={lastDayISO}
                onSelectDay={focusDayOff}
                selectedDay={focusedDayOff.date}
                todayISO={todayISO}
              />
            )}
          </div>
          <DaysOffList items={schedule.daysOff} now={now} onSelectDay={focusDayOff} selectedDay={focusedDayOff.date} />
        </aside>
      </div>

      <section className="calendar-panel" aria-label="Countdown results">
        {validSchedule ? (
          <SchoolCalendar
            focusRequestId={focusedDayOff.requestId}
            calendarWeekdayTop={calendarWeekdayTop}
            schedule={schedule}
            now={now}
            lastDayISO={lastDayISO}
            onSelectDay={focusDayOff}
            selectedDay={focusedDayOff.date}
          />
        ) : (
          <p className="validation" role="status">
            Check school-config.js for valid dates, weekdays, and school hours.
          </p>
        )}
      </section>
    </main>
  );
}

const rootElement = document.querySelector("#root");
const root = globalThis.__schoolCountdownRoot || createRoot(rootElement);
globalThis.__schoolCountdownRoot = root;
root.render(<App />);
