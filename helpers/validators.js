const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const emailValidator = (email) => {
  if (!email || email == "") return false;
  return emailRegex.test(email);
};

const passwordValidator = (password) => {
  if (!password || password === "" || typeof password !== "string") {
    return false;
  }
  return password.length >= 8;
};

const nameValidator = (name) => {
  if (!name || name === "" || typeof name !== "string") {
    return false;
  }
  return name.length <= 25;
};

module.exports = {
  emailValidator,
  passwordValidator,
  nameValidator,
};
