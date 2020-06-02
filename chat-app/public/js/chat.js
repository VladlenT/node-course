const socket = io();
const locationBtn = document.querySelector('#send-location');
const messages = document.querySelector('#messages');
const sidebar = document.querySelector('#sidebar');

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

const form = document.querySelector('form');
const submitBtn = form.elements.namedItem('submit');
const messageInput = form.elements.namedItem('message');

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoscroll = () => {
  const visibleHeight = messages.offsetHeight;
  const containerHeight = messages.scrollHeight;

  const newMessage = messages.lastElementChild;
  const newMsgStyles = getComputedStyle(newMessage);
  const newMsgHeight = visibleHeight + parseInt(newMsgStyles.marginBottom);

  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMsgHeight <= scrollOffset) {
    messages.scrollTo({ top: containerHeight, behavior: 'smooth' });
  }
};

form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.disabled = true;
  messageInput.disabled = true;

  socket.emit('sendMessage', messageInput.value, acknowledgement => {
    submitBtn.disabled = false;

    messageInput.disabled = false;
    messageInput.value = '';
    messageInput.focus();

    console.log(acknowledgement);
  });
});

socket.on('locationMessage', ({ link, createdAt, username }) => {
  const html = Mustache.render(locationMessageTemplate, {
    link,
    username,
    createdAt: moment(createdAt).format('HH:mm'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('message', message => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('HH:mm'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  sidebar.innerHTML = Mustache.render(sidebarTemplate, { room, users });
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

socket.emit('join', { username, room }, error => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
