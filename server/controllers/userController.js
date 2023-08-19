const Users = require("../models/Users");
const catchAsyn = require("../utils/catchAsync");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");
const { Op } = require("sequelize");
const QueryBuilder = require("../utils/queryBuilder");

exports.getAllUser = catchAsyn(async (req, res, next) => {
  const queryBuilder = new QueryBuilder(req.query);

  queryBuilder
    .filter()
    .paginate()
    .limitFields()
    .search(["first_name", "last_name", "username"])
    .sort();
  let allUser = await Users.findAndCountAll({
    ...queryBuilder.queryOptions,
  });
  allUser = queryBuilder.createPage(allUser);
  res.json({
    status: "success",
    message: "",
    data: {
      allUser,
    },
  });
});

exports.updateUserStatus = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await Users.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  const updatedStudent = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedStudent,
    },
  });
});
exports.getById = catchAsyn(async (req, res, next) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);
  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  res.status(201).json({
    status: "success",
    message: "",
    data: {
      byId,
    },
  });
});
exports.createUser = catchAsyn(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  req.body.username.toLowerCase();
  const user = await Users.create(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi yaratildi",
    data: {
      user,
    },
  });
});
exports.updateUser = catchAsyn(async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const err = new AppError("Validation error", 400);
    err.name = "validationError";
    err.errors = validationErrors.errors;
    err.isOperational = false;
    return next(err);
  }

  const { id } = req.params;

  const byId = await User.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Foydalanuvchi topilmadi"));
  }
  req.body.username.toLowerCase();
  const updatedUser = await byId.update(req.body);
  res.json({
    status: "success",
    message: "Foydalanuvchi ma'lumotlari tahrirlandi",
    data: {
      updatedUser,
    },
  });
});
exports.deleteUser = catchAsyn(async (req, res) => {
  const { id } = req.params;
  const byId = await User.findByPk(id);

  if (!byId) {
    return next(new AppError("Bunday ID li Kurs topilmadi"));
  }

  await byId.destroy();

  res.status(201).json({
    status: "success",
    message: "User o'chirildi",
    data: null,
  });
});
