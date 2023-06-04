export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password) => {
  return password.trim().length >= 6;
};

export const validateName = (name) => {
  return name.trim() !== "";
};
