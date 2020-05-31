const generateMessage = text => ({ text, createdAt: new Date().getTime() });
const generateUrl = link => ({ link, createdAt: new Date().getTime() });

module.exports = {
  generateMessage,
  generateUrl,
};
