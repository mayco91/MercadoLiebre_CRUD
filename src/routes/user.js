const express = require('express');
const router = express.Router();
const validateRegister = require("../middlewares/userValidation")
const {register,ingreso} = require ("../controllers/usersControllers.js")

router.get('/register', register); 
router.post('/register',validateRegister, ingreso);

module.exports = router