export const generateRandomId = () => {
  return new Date().getTime() + Math.floor(Math.random() * 100);
};
