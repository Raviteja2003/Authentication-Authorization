const express = require('express');
const { login, register,dashboard,home } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/").post(login)
router.route("/register").post(register)
router.route("/home").get(authenticate,home)
router.route("/dashboard").get(authenticate,dashboard)

module.exports= router;