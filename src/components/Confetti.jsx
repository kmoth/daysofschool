import { classNames } from "../ui.js";

const CONFETTI_DURATION_START_SECONDS = 1.3;
const CONFETTI_DURATION_RANGE_SECONDS = 0.4;
const CONFETTI_DURATION_RANDOM_SEED = 31;

const WEEKEND_CONFETTI_PARTICLES = [
  ["#1f8f62", 10, 0.1, 3.6, 0.2, 18],
  ["#d7fae2", 14, 0.38, 3.5, 0.72, -16],
  ["#6bdc8a", 18, 0.62, 3.9, 0.38, -24],
  ["#2fb978", 23, 0.04, 4.2, 0.16, 24],
  ["#42b883", 28, 0.46, 4.4, 0.68, -14],
  ["#9be7af", 32, 0.76, 3.3, 0.46, 30],
  ["#b9f5ca", 36, 0.82, 3.4, 0.54, 20],
  ["#1f8f62", 41, 0.26, 3.8, 0.84, -28],
  ["#8bdc9d", 46, 0.24, 3.2, 0.42, 26],
  ["#c8f7d7", 50, 0.94, 4.1, 0.24, 14],
  ["#1f8f62", 55, 0.58, 4.0, 0.78, -18],
  ["#6bdc8a", 59, 0.14, 3.6, 0.62, 22],
  ["#2fb978", 64, 0.72, 4.1, 0.88, -22],
  ["#b9f5ca", 68, 0.52, 3.4, 0.34, -12],
  ["#9be7af", 72, 0.18, 3.7, 0.32, 16],
  ["#42b883", 77, 0.86, 4.3, 0.7, 28],
  ["#c8f7d7", 82, 0.34, 3.8, 0.12, 12],
  ["#8bdc9d", 86, 0.66, 3.5, 0.48, -20],
  ["#4fcf83", 90, 0.9, 4.3, 0.58, -28],
  ["#d7fae2", 94, 0.28, 3.9, 0.9, 18],
];

const CONFETTI_PARTICLES = [
  ["#e63946", -136, -76, 258, 220, "8px"],
  ["#f4a261", -102, -114, 318, -180, "7px"],
  ["#2a9d8f", -62, -136, 286, 150, "9px"],
  ["#457b9d", -18, -148, 336, 260, "6px"],
  ["#ffbe0b", 42, -132, 292, -210, "8px"],
  ["#8338ec", 88, -104, 312, 190, "7px"],
  ["#fb5607", 132, -66, 262, -250, "9px"],
  ["#06d6a0", 156, -18, 284, 170, "6px"],
  ["#ef476f", 142, 36, 236, 230, "8px"],
  ["#118ab2", 104, 78, 244, -160, "7px"],
  ["#ffd166", 52, 102, 214, 140, "9px"],
  ["#3a86ff", -4, 112, 238, -230, "6px"],
  ["#8ac926", -56, 98, 224, 200, "8px"],
  ["#ff006e", -108, 68, 248, -140, "7px"],
  ["#00b4d8", -148, 18, 272, 240, "9px"],
  ["#ffca3a", -162, -24, 288, -190, "6px"],
  ["#e76f51", -124, -92, 304, 210, "8px"],
  ["#7209b7", -76, -126, 322, -240, "7px"],
  ["#43aa8b", -28, -156, 342, 160, "9px"],
  ["#f72585", 26, -144, 296, -170, "6px"],
  ["#4cc9f0", 76, -118, 318, 250, "8px"],
  ["#f77f00", 124, -84, 284, -220, "7px"],
  ["#90be6d", 166, -34, 264, 180, "9px"],
  ["#9b5de5", 154, 24, 242, -150, "6px"],
  ["#00f5d4", 116, 72, 234, 230, "8px"],
  ["#f15bb5", 62, 106, 218, -260, "7px"],
  ["#fee440", 8, 124, 206, 170, "9px"],
  ["#00bbf9", -44, 108, 228, -200, "6px"],
  ["#ff595e", -94, 82, 246, 220, "8px"],
  ["#1982c4", -144, 42, 268, -180, "7px"],
];

function seededRandom(value) {
  const random = Math.sin(value) * 10000;
  return random - Math.floor(random);
}

function getConfettiDurationSeconds(index) {
  return (
    CONFETTI_DURATION_START_SECONDS +
    seededRandom(CONFETTI_DURATION_RANDOM_SEED + index * 11) * CONFETTI_DURATION_RANGE_SECONDS
  );
}

export function ConfettiBurst({ className }) {
  return (
    <span className={classNames("confetti-burst", className)} aria-hidden="true">
      {CONFETTI_PARTICLES.map(([color, x, y, fall, rotate, size], index) => {
        const durationSeconds = getConfettiDurationSeconds(index);
        const gravity = Math.max(52, Math.round(fall * 0.22));

        return (
          <span
            key={`${color}-${index}`}
            className="confetti-burst-particle"
            style={{
              "--confetti-color": color,
              "--confetti-delay": `${-(durationSeconds * index) / CONFETTI_PARTICLES.length}s`,
              "--confetti-duration": `${durationSeconds.toFixed(2)}s`,
              "--confetti-end-rotate": `${rotate + 180}deg`,
              "--confetti-end-y": `${y + gravity}px`,
              "--confetti-mid-rotate": `${Math.round(rotate * 0.5)}deg`,
              "--confetti-mid-x": `${Math.round(x * 0.5)}px`,
              "--confetti-mid-y": `${Math.round(y * 0.5 + gravity * 0.25)}px`,
              "--confetti-rotate": `${rotate}deg`,
              "--confetti-size": size,
              "--confetti-x": `${x}px`,
              "--confetti-y": `${y}px`,
            }}
          />
        );
      })}
    </span>
  );
}

export function WeekendConfetti() {
  return (
    <span className="calendar-weekend-confetti" aria-hidden="true">
      {WEEKEND_CONFETTI_PARTICLES.map(([color, left, delay, duration, drift, rotate], index) => (
        <span
          key={`${color}-${index}`}
          className="calendar-weekend-confetti-piece"
          style={{
            "--weekend-confetti-color": color,
            "--weekend-confetti-delay": `${delay * -duration * 0.5}s`,
            "--weekend-confetti-drift": `${(drift - 0.5) * 18}px`,
            "--weekend-confetti-duration": `${duration * 0.5}s`,
            "--weekend-confetti-left": `${left}%`,
            "--weekend-confetti-rotate": `${rotate}deg`,
          }}
        />
      ))}
    </span>
  );
}
