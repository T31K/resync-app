export const generateUUID = async () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 9; i++) {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    randomString += randomChar;
  }

  const formattedString = randomString.replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');
  return formattedString;
};
