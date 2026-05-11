import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SCHOOL_COUNTDOWN_CONFIG } from "../school-config.js";
import {
  getCountdownValues,
  getHeadlineText,
  getLastSchoolDay,
  getSummerCalendarSchedule,
  getTodayCountdown,
  getTodayDate,
  hasExceededSchoolYear,
  normalizeDateRange,
} from "./countdown.js";
import { getTestNowFromQuery } from "./devTime.js";
import { createFocusState, rolloverTodayFocus, selectFocusedDay } from "./focus.js";
import { getRemainingSecondsToday, isValidSchedule, normalizeSchedule, toISO } from "./schedule.js";
import { classNames } from "./ui.js";
import { CountdownHeader } from "./components/CountdownHeader.jsx";
import { HighlightsPanel } from "./components/HighlightsPanel.jsx";
import { SchoolCalendar } from "./components/SchoolCalendar.jsx";
import { SummerModePage } from "./components/SummerModePage.jsx";
import { useHeaderGapCssVar } from "./hooks/useHeaderGapCssVar.js";
import { useNow } from "./hooks/useNow.js";
import { useStandaloneDisplayModeClass } from "./hooks/useStandaloneDisplayModeClass.js";

export function App() {
  useStandaloneDisplayModeClass();

  const realNow = useNow();
  const countdownHeaderRef = useRef(null);
  const [countdownUnit, setCountdownUnit] = useState("days");
  const [showParentsCountdown, setShowParentsCountdown] = useState(false);
  const schoolSchedule = useMemo(() => normalizeSchedule(SCHOOL_COUNTDOWN_CONFIG), []);
  const validSchoolSchedule = isValidSchedule(schoolSchedule);
  const summerDateRange = useMemo(() => normalizeDateRange(SCHOOL_COUNTDOWN_CONFIG.summerBreak), []);
  const summerSchedule = useMemo(() => getSummerCalendarSchedule(summerDateRange), [summerDateRange]);
  const validSummerSchedule = isValidSchedule(summerSchedule);
  const now = useMemo(() => {
    if (!validSchoolSchedule) return realNow;
    return getTestNowFromQuery(schoolSchedule, realNow) || realNow;
  }, [realNow, schoolSchedule, validSchoolSchedule]);
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDay = now.getDate();
  const todayDate = useMemo(() => getTodayDate(now), [todayDay, todayMonth, todayYear]);
  const todayISO = useMemo(() => toISO(todayDate), [todayDate]);
  const [focusedDayOff, setFocusedDayOff] = useState(() => createFocusState(todayISO));
  const previousTodayISORef = useRef(todayISO);
  const isSummerMode = validSchoolSchedule && hasExceededSchoolYear(now, schoolSchedule);
  const isParentsSummerCountdown = isSummerMode && showParentsCountdown && validSummerSchedule;
  const schedule = isParentsSummerCountdown ? summerSchedule : schoolSchedule;
  const validSchedule = isParentsSummerCountdown ? validSummerSchedule : validSchoolSchedule;
  const countdownValues = getCountdownValues({
    countdownUnit,
    isParentsSummerCountdown,
    now,
    schedule,
    summerDateRange,
    validSchedule,
  });
  const headlineText = getHeadlineText({
    isParentsSummerCountdown,
    ...countdownValues,
  });
  const todayCountdown = getTodayCountdown({
    isParentsSummerCountdown,
    now,
    schedule,
    validSchedule,
    ...countdownValues,
  });
  const lastDayISO = validSchedule ? toISO(getLastSchoolDay(schedule) || schedule.lastDay) : "";
  const canToggleCountdownUnit = !isParentsSummerCountdown && !countdownValues.isOneSchoolDayLeft;
  const calendarCurrentDayHasNoSchoolLeft = validSchedule ? getRemainingSecondsToday(now, schedule) <= 0 : false;
  const calendarWeekdayTop = useHeaderGapCssVar(
    countdownHeaderRef,
    "--calendar-weekday-top",
    isParentsSummerCountdown,
  );

  useEffect(() => {
    const previousTodayISO = previousTodayISORef.current;
    setFocusedDayOff((current) => rolloverTodayFocus(current, previousTodayISO, todayISO));
    previousTodayISORef.current = todayISO;
  }, [todayISO]);

  useEffect(() => {
    document.title = isSummerMode && !isParentsSummerCountdown
      ? "School's Out for Summer"
      : validSchedule
        ? headlineText
        : "School Days Left";
  }, [headlineText, isParentsSummerCountdown, isSummerMode, validSchedule]);

  const focusDayOff = useCallback((date, source) => {
    setFocusedDayOff((current) => selectFocusedDay(current, date, source));
  }, []);

  const toggleCountdownUnit = useCallback(() => {
    if (!canToggleCountdownUnit) return;
    setCountdownUnit((current) => (current === "days" ? "weeks" : "days"));
  }, [canToggleCountdownUnit]);

  if (isSummerMode && !isParentsSummerCountdown) {
    return <SummerModePage onRevealCountdown={() => setShowParentsCountdown(true)} />;
  }

  return (
    <main className={classNames("app-shell", isParentsSummerCountdown && "summer-countdown-shell")}>
      {validSchedule && <div className="calendar-top-blur" aria-hidden="true" />}

      <CountdownHeader
        canToggleCountdownUnit={canToggleCountdownUnit}
        headlineText={headlineText}
        isOneSchoolDayLeft={countdownValues.isOneSchoolDayLeft}
        isParentsSummerCountdown={isParentsSummerCountdown}
        onToggleCountdownUnit={toggleCountdownUnit}
        remainingSchoolDays={countdownValues.remainingSchoolDays}
        remainingSchoolWeeks={countdownValues.remainingSchoolWeeks}
        remainingSummerDays={countdownValues.remainingSummerDays}
        showWeeks={countdownValues.showWeeks}
        todayCountdown={todayCountdown}
        validSchedule={validSchedule}
        headerRef={countdownHeaderRef}
      />

      <HighlightsPanel
        emptyMessage={isParentsSummerCountdown ? "Back to school is the next marker." : undefined}
        focusRequestId={focusedDayOff.requestId}
        focusSource={focusedDayOff.source}
        heading={isParentsSummerCountdown ? "Summer" : "Highlights"}
        items={schedule.daysOff}
        lastDayISO={lastDayISO}
        now={todayDate}
        onSelectDay={focusDayOff}
        selectedDay={focusedDayOff.date}
        todayISO={todayISO}
        validSchedule={validSchedule}
      />

      <section className="calendar-panel" aria-label="Countdown results">
        {validSchedule ? (
          <SchoolCalendar
            calendarWeekdayTop={calendarWeekdayTop}
            currentDayHasNoSchoolLeft={calendarCurrentDayHasNoSchoolLeft}
            focusRequestId={focusedDayOff.requestId}
            focusSource={focusedDayOff.source}
            lastDayISO={lastDayISO}
            onSelectDay={focusDayOff}
            schedule={schedule}
            selectedDay={focusedDayOff.date}
            todayDate={todayDate}
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
