const express = require("express");
const cors = require("cors");
const errorController = require("./controllers/errorController");
const AppError = require("./utils/AppError");
const authMiddleware = require("./middlewares/authMiddleware");
const userRoutes=require("./routes/userRoutes");
const authRoutes=require("./routes/authRoutes");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/users", authMiddleware, userRoutes);
app.use("/api/v1/auth", authRoutes);
app.all("*", (req, res, next) => {
  return next(new AppError(`${req.path} not exists`, 404));
});
app.use(errorController);
module.exports = app;