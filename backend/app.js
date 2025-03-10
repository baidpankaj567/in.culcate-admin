require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");

// Routes
const registeruser = require("./routers/register");
const adminlogin = require("./routers/login");
const Article = require("./routers/article");
const Authentication = require("./middleware/authentication");

// Security Packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Middleware
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// Routes Middleware

app.use("/api/admin/v1/auth", adminlogin);
app.use("/api/admin/v1/register", Authentication, registeruser);
app.use("/api/admin/v1/article", Authentication, Article);

// Server Port
const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
