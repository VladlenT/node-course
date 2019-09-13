function getWeatherForecast(e) {
  e.preventDefault();
  const search = document.querySelector('input');
  const messageOne = document.querySelector('#message-1');
  const messageTwo = document.querySelector('#message-2');

  fetch(`/weather?address=${encodeURIComponent(search.value)}`)
    .then(res => res.json())
    .then(res => {
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
