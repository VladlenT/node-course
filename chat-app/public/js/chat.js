const socket = io();
const form = document.querySelector('form');
const locationBtn = document.querySelector('#send-location');

form.addEventListener('submit', e => {
  e.preventDefault();
  const messageInput = form.elements.namedItem('message');

  socket.emit('sendMessage', messageInput.value, acknowledgement => {
    console.log(acknowledgement);
  });

  messageInput.value = '';
});

socket.on('message', message => {
  console.log(message);
});

locationBtn.addEventListener('click', () => {
  if (!navigator.geolocation) return alert('Geolocation is not supported by your browser');

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    socket.emit('sendLocation', { latitude, longitude }, () => {
      console.log('Location shared!');
    });
  });
});
