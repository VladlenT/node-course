function getWeatherForecast(e) {
  e.preventDefault();
  const search = document.querySelector('input');
  const messageOne = document.querySelector('#message-1');
  const messageTwo = document.querySelector('#message-2');

  clearAll(messageOne, messageTwo);

  messageTwo.textContent = 'Loading...';

  fetch(`/weather?address=${encodeURIComponent(search.value)}`)
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        messageOne.textContent = res.error;
        clearAll(messageTwo);
        return;
      }
      messageOne.textContent = res.location;
      messageTwo.textContent = res.forecast;
    })
    .catch(e => {
      messageOne.textContent = 'Invalid input';
      messageTwo.textContent = e.error;
    });

  search.value = '';
}

const weatherForm = document.querySelector('form');
weatherForm.addEventListener('submit', getWeatherForecast);

const clearAll = (...inputsArray) => inputsArray.forEach((e) => e.textContent = '');
