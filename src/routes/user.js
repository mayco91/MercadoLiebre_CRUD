const express = require('express');
const router = express.Router();
const validateRegister = require("../middlewares/userValidation")
const {register,ingreso,login,logeo} = require ("../controllers/usersControllers.js")

//formulario de registro
router.get('/register', register); 
router.post('/register',validateRegister, ingreso);

//formulario de logeo
router.get("/login", login);
router.post("/login",validateRegister, logeo)
module.exports = router