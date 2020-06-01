const generateMessage = (text, username = 'Anon') => ({
  text,
  createdAt: new Date().getTime(),
  username,
});
const generateUrl = (link, username = 'Anon') => ({
  link,
  createdAt: new Date().getTime(),
  username,
});

module.exports = {
  generateMessage,
  generateUrl,
};
