import { addDays } from "./schedule.js";
import { getDateAtClock, getDateAtSchoolTime, getLastSchoolDay, getSchoolDayByIndex } from "./countdown.js";

export function getQueryDayTarget(search) {
  const value = new URLSearchParams(search).get("day")?.toLowerCase();
  if (value === "last" || value === "summer") return value;
  if (!value || !/^\d+$/.test(value)) return null;

  return Number(value);
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

export function getTestNowFromQuery(schedule, clock, search = globalThis.window?.location?.search || "") {
  const dayTarget = getQueryDayTarget(search);
  if (dayTarget === null) return null;

  if (dayTarget === "summer") {
    return getDateAtClock(addDays(schedule.lastDay, 1), clock);
  }

  if (dayTarget === "last") return getLastSchoolDayTestNow(schedule, clock);

  const schoolDay = getSchoolDayByIndex(schedule, dayTarget);
  return schoolDay ? getDateAtClock(schoolDay, clock) : null;
}
