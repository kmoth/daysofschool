import assert from "node:assert/strict";
import test from "node:test";
import {
  formatDayOff,
  futureDatedItems,
  getRemainingSecondsToday,
  getRemainingSecondsYear,
  isSchoolDay,
  isValidSchedule,
  normalizeSchedule,
  parseISO,
} from "../src/schedule.js";

function schoolConfig(overrides = {}) {
  return {
    schoolHours: {
      start: "09:00",
      end: "15:00",
      ...overrides.schoolHours,
    },
    schoolWeekdays: [1, 2, 3, 4, 5],
    schoolYear: {
      firstDay: "2026-01-05",
      lastDay: "2026-01-09",
      ...overrides.schoolYear,
    },
    daysOff: [{ date: "2026-01-07", label: "PA day", type: "pa" }],
    ...overrides,
  };
}

test("parseISO rejects impossible dates instead of rolling them forward", () => {
  assert.equal(parseISO("2026-02-31"), null);
  assert.equal(parseISO("2026-13-01"), null);
  assert.equal(parseISO("not-a-date"), null);
  assert.equal(parseISO("2026-02-28")?.getDate(), 28);
});

test("normalizeSchedule validates date ranges, school hours, weekdays, and days off", () => {
  assert.equal(isValidSchedule(normalizeSchedule(schoolConfig())), true);
  assert.equal(isValidSchedule(normalizeSchedule(schoolConfig({ schoolHours: { end: "99:99" } }))), false);
  assert.equal(isValidSchedule(normalizeSchedule(schoolConfig({ schoolHours: { start: "15:00", end: "09:00" } }))), false);
  assert.equal(isValidSchedule(normalizeSchedule(schoolConfig({ schoolWeekdays: [8, "x"] }))), false);
  assert.equal(isValidSchedule(normalizeSchedule(schoolConfig({ daysOff: [{ date: "2026-02-31" }] }))), false);
  assert.equal(
    isValidSchedule(
      normalizeSchedule(
        schoolConfig({
          schoolYear: {
            firstDay: "2026-01-10",
            lastDay: "2026-01-09",
          },
        }),
      ),
    ),
    false,
  );
});

test("isSchoolDay excludes weekends, days off, and dates outside the school year", () => {
  const schedule = normalizeSchedule(schoolConfig());

  assert.equal(isSchoolDay(new Date(2026, 0, 5), schedule), true);
  assert.equal(isSchoolDay(new Date(2026, 0, 7), schedule), false);
  assert.equal(isSchoolDay(new Date(2026, 0, 10), schedule), false);
  assert.equal(isSchoolDay(new Date(2026, 0, 12), schedule), false);
});

test("remaining school time counts only configured school hours and future school days", () => {
  const schedule = normalizeSchedule(schoolConfig());

  assert.equal(getRemainingSecondsToday(new Date(2026, 0, 5, 10, 0), schedule), 5 * 3600);
  assert.equal(getRemainingSecondsYear(new Date(2026, 0, 5, 10, 0), schedule), 23 * 3600);
  assert.equal(getRemainingSecondsYear(new Date(2026, 0, 9, 15, 1), schedule), 0);
});

test("futureDatedItems and formatDayOff use normalized local dates", () => {
  const items = [
    { date: "2026-01-05", label: "Past" },
    { date: "2026-01-06", label: "Today" },
    { date: "2026-01-07", label: "Future" },
    { date: "bad", label: "Invalid" },
  ];

  assert.deepEqual(
    futureDatedItems(items, new Date(2026, 0, 6, 12, 0)).map((item) => item.label),
    ["Today", "Future"],
  );
  const label = formatDayOff({ date: "2026-01-07", label: "PA day" });
  assert.match(label, /PA day$/);
  assert.doesNotMatch(label, /2026/);
});
