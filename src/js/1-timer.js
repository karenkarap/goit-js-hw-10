import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const refs = {
  button: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  timer: {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
  },
};

refs.button.disabled = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.button.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      refs.button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

let intervalId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

const onBtnClick = event => {
  if (intervalId) {
    clearInterval(intervalId);
  }

  refs.button.disabled = true;
  refs.input.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date();
    let timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      refs.button.disabled = true;
      refs.input.disabled = false;

      refs.timer.days.textContent = '00';
      refs.timer.hours.textContent = '00';
      refs.timer.minutes.textContent = '00';
      refs.timer.seconds.textContent = '00';
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      refs.timer.days.textContent = pad(days);
      refs.timer.hours.textContent = pad(hours);
      refs.timer.minutes.textContent = pad(minutes);
      refs.timer.seconds.textContent = pad(seconds);
    }
  }, 1000);
};

refs.button.addEventListener('click', onBtnClick);
