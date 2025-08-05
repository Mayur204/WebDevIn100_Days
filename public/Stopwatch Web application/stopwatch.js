let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
  const diffInHrs = time / 3600000;
  const hh = Math.floor(diffInHrs);

  const diffInMin = (diffInHrs - hh) * 60;
  const mm = Math.floor(diffInMin);

  const diffInSec = (diffInMin - mm) * 60;
  const ss = Math.floor(diffInSec);

  const diffInMs = (diffInSec - ss) * 1000;
  const ms = Math.floor(diffInMs);

  const formattedMM = mm.toString().padStart(2, '0');
  const formattedSS = ss.toString().padStart(2, '0');
  const formattedMS = ms.toString().padStart(3, '0');

  return `${formattedMM}:${formattedSS}.${formattedMS}`;
}

function print(txt) {
  timeDisplay.innerHTML = txt;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 10);
  showButton('PAUSE');
}

function pause() {
  clearInterval(timerInterval);
  showButton('START');
}

function reset() {
  clearInterval(timerInterval);
  print('00:00.000');
  elapsedTime = 0;
  laps = [];
  renderLaps();
  showButton('START');
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  laps.push(elapsedTime);
  renderLaps();
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lapTime, index) => {
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.textContent = `Lap ${index + 1}: ${timeToString(lapTime)}`;
    lapsList.appendChild(lapElement);
  });
}

function showButton(buttonKey) {
  switch(buttonKey) {
    case 'START':
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = elapsedTime === 0;
      lapBtn.disabled = elapsedTime === 0;
      break;
    case 'PAUSE':
      startBtn.disabled = true;
      pauseBtn.disabled = false;
      resetBtn.disabled = false;
      lapBtn.disabled = false;
      break;
  }
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
