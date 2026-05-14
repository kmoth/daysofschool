import { memo, useCallback, useMemo } from "react";
import {
  CALENDAR_WEEK_STARTS_ON,
  WEEKDAY_LABELS,
  endOfPaddedCalendar,
  getCalendarMonthKey,
  getCalendarMonths,
  getDaysInMonth,
  getMonthLabel,
  monthLabelFormatter,
  startOfPaddedCalendar,
} from "../calendarMath.js";
import { getCalendarDaySelectionState } from "../calendarDayState.js";
import { FOCUS_SOURCE_CALENDAR, FOCUS_SOURCE_LIST } from "../focus.js";
import { getDayOffType, isSchoolDay, parseISO, toISO } from "../schedule.js";
import { classNames } from "../ui.js";
import { ConfettiBurst, WeekendConfetti } from "./Confetti.jsx";
import { useAttentionPulse } from "../hooks/useAttentionPulse.js";
import { useDocumentCalendarFocus } from "../hooks/useDocumentCalendarFocus.js";

function seededRandom(value) {
  const random = Math.sin(value) * 10000;
  return random - Math.floor(random);
}

function getDateSeed(value) {
  return [...value].reduce((seed, character, index) => seed + character.charCodeAt(0) * (index + 1), 0);
}

function getPassedMarkStyle(date) {
  const seed = getDateSeed(date);
  const rotation = (seededRandom(seed + 17) - 0.5) * 14;
  const offsetX = Math.round((seededRandom(seed + 29) - 0.5) * 6);
  const offsetY = Math.round((seededRandom(seed + 41) - 0.5) * 6);
  const scale = 0.94 + seededRandom(seed + 53) * 0.14;

  return {
    "--passed-mark-rotate": `${rotation.toFixed(2)}deg`,
    "--passed-mark-scale": scale.toFixed(3),
    "--passed-mark-x": `${offsetX}px`,
    "--passed-mark-y": `${offsetY}px`,
  };
}

function getSelectedOutlineClass({ isDayOff, isLastSchoolDay, isSelectedDay }) {
  if (!isSelectedDay) return "";
  if (isLastSchoolDay) return "calendar-day-outline-selected-last";
  if (isDayOff) return "calendar-day-outline-selected-day-off";
  return "";
}

function getCalendarDayTypeClass(date, schedule) {
  const dayOff = schedule.allDaysOff.get(date);
  if (dayOff) {
    return classNames("calendar-day-fill-day-off", getDayOffType(dayOff) === "pa" && "calendar-day-fill-pa");
  }

  const parsedDate = parseISO(date);
  return parsedDate && isSchoolDay(parsedDate, schedule) ? "calendar-day-fill-school" : "";
}

function CalendarPassedMark({ date, variant }) {
  const isDayOff = variant === "day-off";

  return (
    <span
      className={classNames("calendar-day-passed-mark", isDayOff && "calendar-day-passed-mark-day-off")}
      style={getPassedMarkStyle(date)}
      aria-hidden="true"
    >
      <svg
        className="calendar-day-passed-mark-lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path className="calendar-day-passed-mark-stroke" d="M10 13 C24 27 37 41 49 52 C63 65 76 77 91 88" />
        <path
          className="calendar-day-passed-mark-stroke calendar-day-passed-mark-stroke-echo"
          d="M14 10 C27 29 41 43 54 56 C68 69 79 78 87 91"
        />
        <path className="calendar-day-passed-mark-stroke" d="M89 12 C74 27 60 42 48 54 C34 67 22 78 11 90" />
        <path
          className="calendar-day-passed-mark-stroke calendar-day-passed-mark-stroke-echo"
          d="M92 16 C75 31 62 44 51 55 C37 68 24 76 14 87"
        />
      </svg>
    </span>
  );
}

function CalendarDay({
  attentionDay,
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
  const { isDayOff, isLastSchoolDay, isPastDayOff, isSelectable } = getCalendarDaySelectionState({
    date,
    lastDayISO,
    schedule,
    todayISO,
  });
  const isCurrentDay = date === todayISO;
  const isSelectedDay = date === selectedDay && !isPastDayOff;
  const isAttentionDay = date === attentionDay;
  const isWeekend = parsedDate ? parsedDate.getDay() === 0 || parsedDate.getDay() === 6 : false;
  const isCurrentWeekend = isCurrentDay && isWeekend;
  const isSchoolDate = Boolean(parsedDate && isSchoolDay(parsedDate, schedule));
  const isPastMarkedDay = isSchoolDate && (date < todayISO || (isCurrentDay && currentDayHasNoSchoolLeft));
  const isCurrentLastSchoolDay = isCurrentDay && isLastSchoolDay;
  const selectedOutlineClass = getSelectedOutlineClass({
    isDayOff,
    isLastSchoolDay,
    isSelectedDay,
  });

  return (
    <li
      className={classNames(
        "calendar-day",
        isCurrentDay && "calendar-day-today",
        isSelectable && "calendar-day-selectable",
        isLastSchoolDay && "calendar-day-last-school-day",
        isAttentionDay && "calendar-day-attention",
      )}
      aria-current={isCurrentDay ? "date" : undefined}
      aria-label={date}
      data-date={date}
    >
      <span className="calendar-month-fill" aria-hidden="true" />
      {isCurrentWeekend && <WeekendConfetti />}
      {isCurrentLastSchoolDay && <span className="calendar-last-day-sunburst" aria-hidden="true" />}
      {dayTypeClass && (
        <span
          className={classNames(
            "calendar-day-fill",
            dayTypeClass,
            isLastSchoolDay && "calendar-day-fill-last",
            isCurrentLastSchoolDay && "calendar-last-day-pulse",
          )}
          aria-hidden="true"
        />
      )}
      {(isSelectedDay || isCurrentWeekend) && (
        <span
          className={classNames(
            "calendar-day-outline",
            selectedOutlineClass,
            isCurrentLastSchoolDay && "calendar-last-day-pulse",
            isCurrentWeekend && "calendar-day-outline-current-weekend",
          )}
          aria-hidden="true"
        />
      )}
      {isPastMarkedDay && <CalendarPassedMark date={date} variant="school" />}
      {isPastDayOff && <CalendarPassedMark date={date} variant="day-off" />}
      {day === 1 && <span className="calendar-month-label">{getMonthLabel(parsedDate)}</span>}
      {isLastSchoolDay && <ConfettiBurst className="calendar-last-day-confetti" />}
      <span
        className={classNames(
          "calendar-day-number",
          isDayOff && "calendar-day-number-day-off",
          isCurrentDay && "calendar-day-number-current",
          isCurrentLastSchoolDay && "calendar-last-day-pulse",
          isCurrentWeekend && "calendar-day-number-current-weekend",
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
          onClick={() => onSelectDay(date, FOCUS_SOURCE_CALENDAR)}
        />
      )}
    </li>
  );
}

function CalendarWeekdays() {
  return (
    <ol className="calendar-weekdays" aria-hidden="true">
      {WEEKDAY_LABELS.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ol>
  );
}

function CalendarMonth({
  attentionDay,
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
        {days.map((dayDate) => {
          const iso = toISO(dayDate);
          return (
            <CalendarDay
              key={iso}
              attentionDay={attentionDay}
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
  attentionDay,
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
          attentionDay={attentionDay}
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

export const SchoolCalendar = memo(function SchoolCalendar({
  calendarWeekdayTop,
  currentDayHasNoSchoolLeft,
  focusRequestId,
  focusSource,
  lastDayISO,
  onSelectDay,
  schedule,
  selectedDay,
  todayDate,
}) {
  const [attentionDay, triggerAttentionPulse] = useAttentionPulse();
  const calendarFirstDay = useMemo(() => startOfPaddedCalendar(schedule.firstDay), [schedule.firstDay]);
  const calendarLastDay = useMemo(() => endOfPaddedCalendar(schedule.lastDay), [schedule.lastDay]);
  const calendarMonths = useMemo(
    () => getCalendarMonths(calendarFirstDay, calendarLastDay),
    [calendarFirstDay, calendarLastDay],
  );
  const todayISO = useMemo(() => toISO(todayDate), [todayDate]);
  const focusedDayISO = selectedDay || todayISO;
  const handleCalendarFocusSettled = useCallback(
    (date) => {
      if (focusSource !== FOCUS_SOURCE_LIST) return;
      triggerAttentionPulse(date);
    },
    [focusSource, triggerAttentionPulse],
  );

  useDocumentCalendarFocus(focusRequestId, focusedDayISO, calendarWeekdayTop, handleCalendarFocusSettled);

  return (
    <>
      <CalendarWeekdays />
      <div className="calendar-shell" aria-label="Calendar">
        <CalendarMonthList
          attentionDay={attentionDay}
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
});
