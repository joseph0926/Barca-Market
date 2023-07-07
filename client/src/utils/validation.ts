export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): boolean => {
  return password.trim().length >= 6;
};

export const validateName = (name: string): boolean => {
  return name.trim() !== "";
};

export const validatePost = (post: string): boolean => {
  return post.trim().length <= 300;
};

export const validateHash = (hash: string): boolean => {
  return hash.startsWith("#");
};
