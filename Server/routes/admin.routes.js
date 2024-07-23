const express = require("express");
const router = express.Router();
const adminRequired = require("../middlewares/validateToken");
const adminController = require("../controllers/admin.controller");


router.get('/', adminRequired, adminController.getAllUsers);

router.post('/', adminRequired, adminController.addUser);

router.put('/:id', adminRequired, adminController.updateUser);

router.delete('/:id', adminRequired, adminController.deleteUser);

module.exports = router;