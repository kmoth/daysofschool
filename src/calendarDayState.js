export function getCalendarDaySelectionState({ date, lastDayISO, schedule, todayISO }) {
  const isDayOff = schedule.allDaysOff.has(date);
  const isLastSchoolDay = date === lastDayISO;
  const isPastDayOff = isDayOff && date < todayISO;

  return {
    isDayOff,
    isLastSchoolDay,
    isPastDayOff,
    isSelectable: isLastSchoolDay || (isDayOff && !isPastDayOff),
  };
}
