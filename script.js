const form = document.getElementById("timerForm");
const countdownDisplay = document.getElementById("countdown");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const resetBtn = document.getElementById("resetBtn");
const alertBox = document.getElementById("alertBox");

let countdownInterval;
let remainingTime;
let paused = false;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const targetDateInput = document.getElementById("targetDate").value;
  const targetDate = new Date(targetDateInput);

  if (targetDate <= new Date()) {
    alert("Please select a future date and time.");
    return;
  }

  clearInterval(countdownInterval);
  paused = false;
  alertBox.classList.add("d-none");

  startCountdown(targetDate);
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  resumeBtn.disabled = true;
});

pauseBtn.addEventListener("click", function () {
  clearInterval(countdownInterval);
  paused = true;
  resumeBtn.disabled = false;
  pauseBtn.disabled = true;
});

resumeBtn.addEventListener("click", function () {
  if (paused && remainingTime > 0) {
    const targetDate = new Date(Date.now() + remainingTime);
    startCountdown(targetDate);
    paused = false;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", function () {
  clearInterval(countdownInterval);
  countdownDisplay.textContent = "00 Days : 00 Hours : 00 Minutes : 00 Seconds";
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;
  resetBtn.disabled = true;
  alertBox.classList.add("d-none");
});

function startCountdown(targetDate) {
  countdownInterval = setInterval(() => {
    const now = new Date();
    remainingTime = targetDate - now;

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      countdownDisplay.textContent =
        "00 Days : 00 Hours : 00 Minutes : 00 Seconds";
      alertBox.classList.remove("d-none");
      document.body.style.backgroundColor = "#b38b2c"; // Gold background
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    countdownDisplay.textContent = `${days} Days : ${hours} Hours : ${minutes} Minutes : ${seconds} Seconds`;
  }, 1000);
}
