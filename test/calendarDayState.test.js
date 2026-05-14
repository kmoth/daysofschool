import assert from "node:assert/strict";
import test from "node:test";
import { getCalendarDaySelectionState } from "../src/calendarDayState.js";
import { normalizeSchedule } from "../src/schedule.js";

function scheduleFixture() {
  return normalizeSchedule({
    schoolHours: {
      start: "09:00",
      end: "15:00",
    },
    schoolWeekdays: [1, 2, 3, 4, 5],
    schoolYear: {
      firstDay: "2026-01-05",
      lastDay: "2026-01-09",
    },
    daysOff: [{ date: "2026-01-07", label: "PA day", type: "pa" }],
  });
}

test("past calendar days off are completed instead of selectable", () => {
  const schedule = scheduleFixture();

  assert.deepEqual(
    getCalendarDaySelectionState({
      date: "2026-01-07",
      lastDayISO: "2026-01-09",
      schedule,
      todayISO: "2026-01-08",
    }),
    {
      isDayOff: true,
      isLastSchoolDay: false,
      isPastDayOff: true,
      isSelectable: false,
    },
  );
});

test("current and future days off stay selectable", () => {
  const schedule = scheduleFixture();

  assert.equal(
    getCalendarDaySelectionState({
      date: "2026-01-07",
      lastDayISO: "2026-01-09",
      schedule,
      todayISO: "2026-01-07",
    }).isSelectable,
    true,
  );
  assert.equal(
    getCalendarDaySelectionState({
      date: "2026-01-07",
      lastDayISO: "2026-01-09",
      schedule,
      todayISO: "2026-01-06",
    }).isSelectable,
    true,
  );
});
