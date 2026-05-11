export const FOCUS_SOURCE_CALENDAR = "calendar";
export const FOCUS_SOURCE_LIST = "list";
export const FOCUS_SOURCE_SHORTCUT = "shortcut";

export function createFocusState(date, source = FOCUS_SOURCE_SHORTCUT) {
  return {
    date,
    requestId: 0,
    source,
  };
}

export function selectFocusedDay(current, date, source = FOCUS_SOURCE_SHORTCUT) {
  return {
    date,
    requestId: current.requestId + 1,
    source,
  };
}

export function rolloverTodayFocus(current, previousTodayISO, todayISO) {
  if (!previousTodayISO || previousTodayISO === todayISO) return current;
  if (current.source !== FOCUS_SOURCE_SHORTCUT || current.date !== previousTodayISO) return current;

  return selectFocusedDay(current, todayISO, FOCUS_SOURCE_SHORTCUT);
}
