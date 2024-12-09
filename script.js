
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const millisecondsDisplay = document.getElementById("milliseconds");
const lapList = document.getElementById("lap-list");


let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval = null;
let running = false;


const startStopwatch = () => {
    if (running) return; 
    running = true;
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
};


const pauseStopwatch = () => {
    running = false;
    clearInterval(interval);
};

const resetStopwatch = () => {
    running = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    lapList.innerHTML = "";
};

const recordLap = () => {
    if (!running) return; 
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap: ${lapTime}`;
    lapList.appendChild(lapItem);
};


const updateDisplay = () => {
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = formatMilliseconds(milliseconds);
};


const formatTime = (time) => (time < 10 ? `0${time}` : time);
const formatMilliseconds = (ms) => (ms < 100 ? `0${Math.floor(ms / 10)}` : ms / 10);


startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);
