import {
  addDays,
  formatDuration,
  getRemainingSecondsToday,
  getRemainingSecondsYear,
  isSchoolDay,
  normalizeSchedule,
  parseISO,
  toISO,
} from "./schedule.js";

export const SECONDS_PER_DAY = 24 * 60 * 60;

const SUMMER_CALENDAR_WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

export function getTodayDate(now) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function getDateAtSchoolTime(date, time) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0, 0);
}

export function getDateAtClock(date, clock) {
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

export function getLastSchoolDay(schedule) {
  let lastSchoolDay = null;
  for (let cursor = new Date(schedule.firstDay); cursor <= schedule.lastDay; cursor = addDays(cursor, 1)) {
    if (isSchoolDay(cursor, schedule)) lastSchoolDay = cursor;
  }

  return lastSchoolDay;
}

export function getSchoolDayByIndex(schedule, targetIndex) {
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

export function hasExceededSchoolYear(now, schedule) {
  return now >= getDateAtSchoolTime(schedule.lastDay, schedule.endTime);
}

export function normalizeDateRange(rawRange) {
  return {
    firstDay: parseISO(rawRange?.firstDay),
    lastDay: parseISO(rawRange?.lastDay),
  };
}

export function isValidDateRange(range) {
  return Boolean(range.firstDay && range.lastDay && range.firstDay <= range.lastDay);
}

export function getSummerCalendarSchedule(range) {
  if (!isValidDateRange(range)) return normalizeSchedule({});

  return normalizeSchedule({
    schoolYear: {
      firstDay: toISO(range.firstDay),
      lastDay: toISO(range.lastDay),
    },
    schoolHours: {
      start: "00:00",
      end: "23:59",
    },
    schoolWeekdays: SUMMER_CALENDAR_WEEKDAYS,
    daysOff: [],
  });
}

export function getSummerCountdownTarget(range) {
  const startOfLastDay = new Date(range.lastDay.getFullYear(), range.lastDay.getMonth(), range.lastDay.getDate());
  return addDays(startOfLastDay, 1);
}

export function getRemainingSecondsDateRange(now, range) {
  if (!isValidDateRange(range)) return 0;

  return Math.max(0, Math.floor((getSummerCountdownTarget(range) - now) / 1000));
}

export function getRemainingCalendarDays(now, range) {
  return Math.ceil(getRemainingSecondsDateRange(now, range) / SECONDS_PER_DAY);
}

export function formatCountdownDuration(totalSeconds) {
  if (totalSeconds <= 0) return "School is back";

  let remainder = totalSeconds;
  const days = Math.floor(remainder / SECONDS_PER_DAY);
  remainder %= SECONDS_PER_DAY;
  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;
  const parts = [
    days ? `${days}d` : null,
    hours ? `${hours}h` : null,
    minutes ? `${minutes}m` : null,
    seconds ? `${seconds}s` : null,
  ].filter(Boolean);

  return parts.length ? parts.join(" ") : "School is back";
}

export function getCountdownValues({ countdownUnit, isParentsSummerCountdown, now, schedule, summerDateRange, validSchedule }) {
  const remainingSecondsYear = validSchedule
    ? isParentsSummerCountdown
      ? getRemainingSecondsDateRange(now, summerDateRange)
      : getRemainingSecondsYear(now, schedule)
    : 0;
  const remainingSecondsToday =
    validSchedule && !isParentsSummerCountdown ? getRemainingSecondsToday(now, schedule) : 0;
  const remainingSummerDays = isParentsSummerCountdown ? getRemainingCalendarDays(now, summerDateRange) : 0;
  const remainingSchoolDays =
    validSchedule && !isParentsSummerCountdown ? Math.ceil(remainingSecondsYear / schedule.dayLengthSeconds) : 0;
  const remainingSchoolWeeks =
    validSchedule && !isParentsSummerCountdown
      ? Math.ceil(remainingSchoolDays / Math.max(1, schedule.weekdays.size))
      : 0;
  const isOneSchoolDayLeft = !isParentsSummerCountdown && remainingSchoolDays === 1;
  const showWeeks = !isParentsSummerCountdown && countdownUnit === "weeks" && !isOneSchoolDayLeft;

  return {
    isOneSchoolDayLeft,
    remainingSchoolDays,
    remainingSchoolWeeks,
    remainingSecondsToday,
    remainingSecondsYear,
    remainingSummerDays,
    showWeeks,
  };
}

export function getHeadlineText({ isOneSchoolDayLeft, isParentsSummerCountdown, remainingSchoolDays, remainingSchoolWeeks, remainingSummerDays, showWeeks }) {
  if (isParentsSummerCountdown) {
    return remainingSummerDays > 0
      ? `${remainingSummerDays} ${remainingSummerDays === 1 ? "day" : "days"} until school is back`
      : "School is back in session";
  }

  if (isOneSchoolDayLeft) return "LAST DAY OF SCHOOL OMG!1!!";

  return showWeeks
    ? `${remainingSchoolWeeks} ${remainingSchoolWeeks === 1 ? "week" : "weeks"} of school left`
    : `${remainingSchoolDays} ${remainingSchoolDays === 1 ? "day" : "days"} of school left`;
}

export function getTodayCountdown({ isParentsSummerCountdown, now, remainingSecondsToday, remainingSecondsYear, schedule, validSchedule }) {
  if (isParentsSummerCountdown) {
    return remainingSecondsYear > 0 ? `${formatCountdownDuration(remainingSecondsYear)} left` : "School is back in session";
  }

  if (remainingSecondsToday > 0) return `${formatDuration(remainingSecondsToday)} left today`;

  const hasSchoolToday = validSchedule && isSchoolDay(getTodayDate(now), schedule);
  return hasSchoolToday ? "No school left today" : "No school today";
}
