const socket = io();
const locationBtn = document.querySelector('#send-location');
const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;

const form = document.querySelector('form');
const submitBtn = form.elements.namedItem('submit');
const messageInput = form.elements.namedItem('message');

form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.setAttribute('disabled', 'disabled');
  messageInput.setAttribute('disabled', 'disabled');

  socket.emit('sendMessage', messageInput.value, acknowledgement => {
    submitBtn.removeAttribute('disabled');

    messageInput.removeAttribute('disabled');
    messageInput.value = '';
    messageInput.focus();

    console.log(acknowledgement);
  });
});

socket.on('locationMessage', ({ link, createdAt }) => {
  const html = Mustache.render(locationMessageTemplate, {
    link,
    createdAt: moment(createdAt).format('HH:mm'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

socket.on('message', message => {
  const html = Mustache.render(messageTemplate, {
    message: message.text,
    createdAt: moment(message.createdAt).format('HH:mm'),
  });
  messages.insertAdjacentHTML('beforeend', html);
});

locationBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation is not supported by your browser');

  locationBtn.setAttribute('disabled', 'disabled');

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      locationBtn.removeAttribute('disabled');
    });
  });
});
