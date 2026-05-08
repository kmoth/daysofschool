const formatter = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });

function pad(value) {
  return String(value).padStart(2, "0");
}

export function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function parseISO(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function addDays(date, amount) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function parseTime(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(value || "");
  if (!match) return null;
  return {
    hours: Number(match[1]),
    minutes: Number(match[2]),
  };
}

function atSchoolTime(date, time) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0, 0);
}

function mergeDaysOff(daysOff) {
  const days = new Map();
  for (const item of [...daysOff]) {
    if (item.date) {
      days.set(item.date, {
        ...item,
        label: item.label || "Day off",
      });
    }
  }
  return days;
}

export function getDayOffType(item) {
  const configuredType = String(item?.type || "").toLowerCase();
  if (["general", "pa", "stat"].includes(configuredType)) return configuredType;

  const label = String(item?.label || "").toLowerCase();
  if (label.includes("pa day")) return "pa";

  const statHolidayLabels = new Set([
    "thanksgiving",
    "family day",
    "good friday",
    "easter monday",
    "victoria day",
  ]);
  if (statHolidayLabels.has(label)) return "stat";

  return "general";
}

export function normalizeSchedule(rawConfig) {
  const firstDay = parseISO(rawConfig?.schoolYear?.firstDay);
  const lastDay = parseISO(rawConfig?.schoolYear?.lastDay);
  const startTime = parseTime(rawConfig?.schoolHours?.start);
  const endTime = parseTime(rawConfig?.schoolHours?.end);
  const weekdays = new Set((rawConfig?.schoolWeekdays || []).map(String));
  const daysOff = rawConfig?.daysOff || [];
  const allDaysOff = mergeDaysOff(daysOff);

  return {
    firstDay,
    lastDay,
    startTime,
    endTime,
    weekdays,
    daysOff,
    allDaysOff,
    dayLengthSeconds: startTime && endTime ? (endTime.hours * 3600 + endTime.minutes * 60) - (startTime.hours * 3600 + startTime.minutes * 60) : 0,
  };
}

export function isValidSchedule(schedule) {
  return schedule.firstDay && schedule.lastDay && schedule.firstDay <= schedule.lastDay && schedule.startTime && schedule.endTime && schedule.dayLengthSeconds > 0 && schedule.weekdays.size > 0;
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

export function disabledWeekdays(schedule) {
  return [0, 1, 2, 3, 4, 5, 6].filter((day) => !schedule.weekdays.has(String(day)));
}

export function disabledDates(schedule) {
  return schedule.daysOff.map((item) => parseISO(item.date)).filter(Boolean);
}
