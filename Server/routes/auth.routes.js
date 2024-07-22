const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authRequired = require("../middlewares/validateToken");
const validateSchema = require("../middlewares/validatorMiddleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

router.post("/register", validateSchema(registerSchema) , userController.register);

router.post("/login", validateSchema(loginSchema), userController.login);

router.post("/logout", userController.logout);

router.get("/verify", userController.verifyToken);

router.get("/profile", authRequired, userController.profile);



module.exports = router;