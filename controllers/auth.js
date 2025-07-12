const { MongoServerError } = require("mongodb");
const generateJWT = require("../helpers/generateJWT");
const bcrypt = require("bcryptjs");
const { nameValidator, hashPassword } = require("../helpers");
const createUser = require("../db/repositories/user/createUser");
const {
  CustomAPIError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { client } = require("../db/connect");

const sign_up = async (req, res, next) => {
  const { name, email, password } = req.body;

  const isValidName = nameValidator(name);
  if (!isValidName) {
    return next(new BadRequestError("Please provide a valid name!"));
  }

  try {
    const hashedPass = await hashPassword(password);
    const userBody = { name, email, password: hashedPass };
    const user = await createUser(userBody);
    const token = generateJWT(user.insertedId.toString(), req.body.name);

    return res.status(201).json({
      success: true,
      msg: "created",
      token,
      user: { name: req.body.name },
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      return next(new BadRequestError("User with the email already exists!"));
    } else {
      return next(new CustomAPIError("Something went wrong!"));
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Please provide the email and password!"));
  }

  const userCollection = client.db("jobs").collection("users");
  const user = await userCollection.findOne({ email });

  if (!user) {
    return next(new UnauthenticatedError("Invalid Credentials!"));
  }

  const isAuthorised = await bcrypt.compare(password, user.password);

  if (!isAuthorised) {
    return next(new UnauthenticatedError("Invalid Credentials!"));
  }

  const token = generateJWT(user._id.toString(), user.name);

  return res.status(201).json({
    success: true,
    msg: "authenticated",
    token,
    user: { name: user.name },
  });
};

module.exports = {
  sign_up,
  login,
};
