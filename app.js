require("dotenv").config();
const { connectToDatabase } = require("./db/connect");
const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const {
  credentialValidator,
  authentication,
  errorHandler,
  notFound,
} = require("./middleware");

app.use(express.json());

app.use("/api/v1/auth", credentialValidator, authRouter);
app.use("/api/v1/jobs", authentication, jobsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
