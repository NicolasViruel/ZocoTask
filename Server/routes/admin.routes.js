const express = require("express");
const router = express.Router();
const adminRequired = require("../middlewares/validateToken");
const adminController = require("../controllers/admin.controller");


router.get('/', adminRequired, adminController.getAllUsers);

module.exports = router;