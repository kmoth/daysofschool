import assert from "node:assert/strict";
import test from "node:test";
import {
  formatCountdownDuration,
  getCountdownValues,
  getHeadlineText,
  getLastSchoolDay,
  getRemainingCalendarDays,
  normalizeDateRange,
} from "../src/countdown.js";
import { FOCUS_SOURCE_LIST, createFocusState, rolloverTodayFocus } from "../src/focus.js";
import { normalizeSchedule, toISO } from "../src/schedule.js";
import { getTestNowFromQuery as getPreviewNowFromQuery } from "../src/devTime.js";

function scheduleFixture() {
  return normalizeSchedule({
    schoolHours: {
      start: "09:00",
      end: "15:00",
    },
    schoolWeekdays: [1, 2, 3, 4, 5],
    schoolYear: {
      firstDay: "2026-01-05",
      lastDay: "2026-01-11",
    },
    daysOff: [{ date: "2026-01-07", label: "PA day", type: "pa" }],
  });
}

test("getLastSchoolDay skips non-school final calendar days", () => {
  assert.equal(toISO(getLastSchoolDay(scheduleFixture())), "2026-01-09");
});

test("summer countdown rounds up remaining calendar days", () => {
  const range = normalizeDateRange({ firstDay: "2026-06-27", lastDay: "2026-09-01" });

  assert.equal(getRemainingCalendarDays(new Date(2026, 8, 1, 0, 0), range), 1);
  assert.equal(getRemainingCalendarDays(new Date(2026, 8, 1, 12, 0), range), 1);
  assert.equal(getRemainingCalendarDays(new Date(2026, 8, 2, 0, 0), range), 0);
});

test("formatCountdownDuration suppresses empty units and handles elapsed countdowns", () => {
  assert.equal(formatCountdownDuration(0), "School is back");
  assert.equal(formatCountdownDuration(90061), "1d 1h 1m 1s");
  assert.equal(formatCountdownDuration(61), "1m 1s");
});

test("getCountdownValues and headline copy cover day/week modes", () => {
  const schedule = scheduleFixture();
  const values = getCountdownValues({
    countdownUnit: "weeks",
    isParentsSummerCountdown: false,
    now: new Date(2026, 0, 5, 9, 0),
    schedule,
    summerDateRange: normalizeDateRange({ firstDay: "2026-06-27", lastDay: "2026-09-01" }),
    validSchedule: true,
  });

  assert.equal(values.remainingSchoolDays, 4);
  assert.equal(values.remainingSchoolWeeks, 1);
  assert.equal(getHeadlineText({ isParentsSummerCountdown: false, ...values }), "1 week of school left");
});

test("query preview dates map to indexed, last, and summer days", () => {
  const schedule = scheduleFixture();
  const clock = new Date(2026, 0, 1, 10, 30);

  assert.equal(toISO(getPreviewNowFromQuery(schedule, clock, "?day=1")), "2026-01-06");
  assert.equal(toISO(getPreviewNowFromQuery(schedule, clock, "?day=last")), "2026-01-09");
  assert.equal(toISO(getPreviewNowFromQuery(schedule, clock, "?day=summer")), "2026-01-12");
});

test("today shortcut focus follows midnight rollover without clobbering explicit selections", () => {
  const shortcutFocus = createFocusState("2026-05-10");
  const rolledFocus = rolloverTodayFocus(shortcutFocus, "2026-05-10", "2026-05-11");

  assert.equal(rolledFocus.date, "2026-05-11");
  assert.equal(rolledFocus.requestId, 1);

  const listFocus = { date: "2026-05-10", requestId: 4, source: FOCUS_SOURCE_LIST };
  assert.equal(rolloverTodayFocus(listFocus, "2026-05-10", "2026-05-11"), listFocus);
});
