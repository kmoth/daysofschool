import { classNames } from "../ui.js";

function CountdownHeadlineContent({
  headlineText,
  isOneSchoolDayLeft,
  isParentsSummerCountdown,
  remainingSchoolDays,
  remainingSchoolWeeks,
  remainingSummerDays,
  showWeeks,
}) {
  if (isParentsSummerCountdown) {
    return remainingSummerDays > 0 ? (
      <>
        <span className="countdown-title-count">{remainingSummerDays}</span>{" "}
        {remainingSummerDays === 1 ? "day" : "days"} until school is back
      </>
    ) : (
      "School is back in session"
    );
  }

  if (isOneSchoolDayLeft) return headlineText;

  if (showWeeks) {
    return (
      <>
        <span className="countdown-title-count">{remainingSchoolWeeks}</span>{" "}
        {remainingSchoolWeeks === 1 ? "week" : "weeks"} of school left
      </>
    );
  }

  return (
    <>
      <span className="countdown-title-count">{remainingSchoolDays}</span>{" "}
      {remainingSchoolDays === 1 ? "day" : "days"} of school left
    </>
  );
}

export function CountdownHeader({
  canToggleCountdownUnit,
  headlineText,
  isOneSchoolDayLeft,
  isParentsSummerCountdown,
  onToggleCountdownUnit,
  remainingSchoolDays,
  remainingSchoolWeeks,
  remainingSummerDays,
  showWeeks,
  todayCountdown,
  validSchedule,
  headerRef,
}) {
  const countdownTitleLabel =
    isParentsSummerCountdown || isOneSchoolDayLeft
      ? headlineText
      : `${headlineText}. Show ${showWeeks ? "days" : "weeks"} of school left`;
  const isFinalDayTitle = isOneSchoolDayLeft && !showWeeks;

  return (
    <header className="countdown-header" ref={headerRef} aria-labelledby="app-title">
      <h1 id="app-title">
        <button
          type="button"
          className={classNames("countdown-title-toggle", isFinalDayTitle && "countdown-title-final-day")}
          aria-label={countdownTitleLabel}
          disabled={!canToggleCountdownUnit}
          onClick={onToggleCountdownUnit}
        >
          {isFinalDayTitle ? (
            <>
              <span className="countdown-title-stroke" aria-hidden="true">
                {headlineText}
              </span>
              <span className="countdown-title-fill" aria-hidden="true">
                {headlineText}
              </span>
            </>
          ) : (
            <CountdownHeadlineContent
              headlineText={headlineText}
              isOneSchoolDayLeft={isOneSchoolDayLeft}
              isParentsSummerCountdown={isParentsSummerCountdown}
              remainingSchoolDays={remainingSchoolDays}
              remainingSchoolWeeks={remainingSchoolWeeks}
              remainingSummerDays={remainingSummerDays}
              showWeeks={showWeeks}
            />
          )}
        </button>
      </h1>
      <p className="precise-countdown">{validSchedule ? todayCountdown : "No school"}</p>
    </header>
  );
}
