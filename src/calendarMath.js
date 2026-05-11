import { parseISO } from "./schedule.js";

export const CALENDAR_ROW_HEIGHT = 58;
export const CALENDAR_START_PADDING_MONTHS = 2;
export const CALENDAR_END_PADDING_MONTHS = 2;
export const CALENDAR_WEEK_STARTS_ON = 0;
export const MS_PER_DAY = 24 * 60 * 60 * 1000;
export const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const monthLabelFormatter = new Intl.DateTimeFormat(undefined, { month: "short" });

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function getCalendarMonthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function getCalendarMonths(firstDay, lastDay) {
  const months = [];
  for (let cursor = startOfMonth(firstDay); cursor <= lastDay; cursor = addMonths(cursor, 1)) {
    months.push(new Date(cursor));
  }

  return months;
}

export function getDaysInMonth(monthStart) {
  const days = [];
  const lastDate = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0).getDate();
  for (let day = 1; day <= lastDate; day += 1) {
    days.push(new Date(monthStart.getFullYear(), monthStart.getMonth(), day));
  }

  return days;
}

export function startOfPaddedCalendar(date) {
  if (!(date instanceof Date)) return date;
  return new Date(date.getFullYear(), date.getMonth() - CALENDAR_START_PADDING_MONTHS, 1);
}

export function endOfPaddedCalendar(date) {
  if (!(date instanceof Date)) return date;
  return new Date(date.getFullYear(), date.getMonth() + CALENDAR_END_PADDING_MONTHS + 1, 0);
}

export function getMonthLabel(date, fallback) {
  return date instanceof Date ? monthLabelFormatter.format(date) : fallback;
}

export function getCalendarDayOrdinal(date) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / MS_PER_DAY);
}

export function getDaysUntilDate(dateValue, now) {
  const date = parseISO(dateValue);
  if (!date) return null;

  return Math.max(0, getCalendarDayOrdinal(date) - getCalendarDayOrdinal(now));
}
