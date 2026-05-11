const formatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
const STAT_HOLIDAY_LABELS = new Set([
  "thanksgiving",
  "family day",
  "good friday",
  "easter monday",
  "victoria day",
]);

function pad(value) {
  return String(value).padStart(2, "0");
}

export function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISO(value) {
  if (typeof value !== "string") return null;

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }

  return date;
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function parseTime(value) {
  if (typeof value !== "string") return null;

  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return null;

  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  };
}

function atSchoolTime(date, time) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0, 0);
}

function normalizeDaysOff(daysOff) {
  const days = new Map();
  const normalizedDaysOff = [];
  let hasInvalidDaysOff = false;

  for (const item of daysOff) {
    const date = parseISO(item?.date);
    if (!date) {
      hasInvalidDaysOff = true;
      continue;
    }

    const normalizedItem = {
      ...item,
      date: toISO(date),
      label: item.label || "Day off",
    };

    normalizedDaysOff.push(normalizedItem);
    days.set(normalizedItem.date, normalizedItem);
  }

  return { allDaysOff: days, daysOff: normalizedDaysOff, hasInvalidDaysOff };
}

export function getDayOffType(item) {
  const configuredType = String(item?.type || "").toLowerCase();
  if (["general", "pa", "stat"].includes(configuredType)) return configuredType;

  const label = String(item?.label || "").toLowerCase();
  if (label.includes("pa day")) return "pa";

  if (STAT_HOLIDAY_LABELS.has(label)) return "stat";

  return "general";
}

export function normalizeSchedule(rawConfig) {
  const firstDay = parseISO(rawConfig?.schoolYear?.firstDay);
  const lastDay = parseISO(rawConfig?.schoolYear?.lastDay);
  const startTime = parseTime(rawConfig?.schoolHours?.start);
  const endTime = parseTime(rawConfig?.schoolHours?.end);
  const weekdays = new Set(
    (Array.isArray(rawConfig?.schoolWeekdays) ? rawConfig.schoolWeekdays : [])
      .map(Number)
      .filter((day) => Number.isInteger(day) && day >= 0 && day <= 6)
      .map(String),
  );
  const normalizedDaysOff = normalizeDaysOff(Array.isArray(rawConfig?.daysOff) ? rawConfig.daysOff : []);
  const startSeconds = startTime ? startTime.hours * 3600 + startTime.minutes * 60 : 0;
  const endSeconds = endTime ? endTime.hours * 3600 + endTime.minutes * 60 : 0;

  return {
    firstDay,
    lastDay,
    startTime,
    endTime,
    weekdays,
    daysOff: normalizedDaysOff.daysOff,
    allDaysOff: normalizedDaysOff.allDaysOff,
    hasInvalidDaysOff: normalizedDaysOff.hasInvalidDaysOff,
    dayLengthSeconds: startTime && endTime ? endSeconds - startSeconds : 0,
  };
}

export function isValidSchedule(schedule) {
  return Boolean(
    schedule.firstDay &&
      schedule.lastDay &&
      schedule.firstDay <= schedule.lastDay &&
      schedule.startTime &&
      schedule.endTime &&
      schedule.dayLengthSeconds > 0 &&
      schedule.weekdays.size > 0 &&
      !schedule.hasInvalidDaysOff,
  );
}

export function isSchoolDay(date, schedule) {
  const iso = toISO(date);
  return schedule.weekdays.has(String(date.getDay())) && !schedule.allDaysOff.has(iso) && date >= schedule.firstDay && date <= schedule.lastDay;
}

function secondsLeftInSchoolDay(now, date, schedule) {
  const dayStart = atSchoolTime(date, schedule.startTime);
  const dayEnd = atSchoolTime(date, schedule.endTime);
  const effectiveStart = now > dayStart ? now : dayStart;
  if (effectiveStart >= dayEnd) return 0;
  return Math.floor((dayEnd - effectiveStart) / 1000);
}

function countFullSchoolDaysAfter(date, schedule) {
  let count = 0;
  for (let cursor = addDays(date, 1); cursor <= schedule.lastDay; cursor = addDays(cursor, 1)) {
    if (isSchoolDay(cursor, schedule)) count += 1;
  }
  return count;
}

export function getRemainingSecondsYear(now, schedule) {
  if (now > atSchoolTime(schedule.lastDay, schedule.endTime)) return 0;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let seconds = 0;
  if (isSchoolDay(today, schedule)) {
    seconds += secondsLeftInSchoolDay(now, today, schedule);
  }
  seconds += countFullSchoolDaysAfter(today, schedule) * schedule.dayLengthSeconds;
  return seconds;
}

export function getRemainingSecondsToday(now, schedule) {
  if (now > atSchoolTime(schedule.lastDay, schedule.endTime)) return 0;

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let seconds = 0;
  if (isSchoolDay(today, schedule)) {
    seconds += secondsLeftInSchoolDay(now, today, schedule);
  }
  return seconds;
}

export function formatDuration(totalSeconds) {
  if (totalSeconds <= 0) return "No school";

  let remainder = totalSeconds;
  const hours = Math.floor(remainder / 3600);
  remainder %= 3600;
  const minutes = Math.floor(remainder / 60);
  const seconds = remainder % 60;
  const parts = [
    hours ? `${hours}h` : null,
    minutes ? `${minutes}m` : null,
    seconds ? `${seconds}s` : null,
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : "No school";
}

export function futureDatedItems(items, now) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return items.filter((item) => {
    const date = parseISO(item.date);
    return date && date >= today;
  });
}

export function formatDayOff(item) {
  const date = parseISO(item.date);
  return date ? `${formatter.format(date)} - ${item.label || "Day off"}` : `${item.date} - invalid date`;
}
