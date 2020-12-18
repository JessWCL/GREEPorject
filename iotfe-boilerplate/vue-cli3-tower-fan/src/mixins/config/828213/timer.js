const TimerData = [[]];
const TimerRange = [];
for (let i = 0.5; i <= 12;) {
  TimerRange[`${i}`] = i * 60;
  TimerData[0].push(
    {
      text: String(i < 10 ? i.toFixed(1) : i),
      value: i,
    }
  );
  if (i < 10) {
    i += 0.5;
  } else {
    i++;
  }
}

const keys = Object.keys(TimerRange).map(x => Number(x)).sort((a, b) => a - b);

export function getTimerIndex(totalMinutes) {
  const timerIndex = keys.find(x => totalMinutes - TimerRange[x] <= 0);
  return timerIndex;
}

export const timerData = TimerData;
