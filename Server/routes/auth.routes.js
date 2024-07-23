const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authRequired = require("../middlewares/validateToken");
const validateSchema = require("../middlewares/validatorMiddleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");

router.post("/register", validateSchema(registerSchema) , authController.register);

router.post("/login", validateSchema(loginSchema), authController.login);

router.post("/logout", authController.logout);

router.get("/verify", authController.verifyToken);

router.get("/profile", authRequired, authController.profile);



module.exports = router;