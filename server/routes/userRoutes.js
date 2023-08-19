const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/", userController.createUser)
  .get("/:id", userController.getById)
  .get("/", userController.getAllUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser)

module.exports = router;