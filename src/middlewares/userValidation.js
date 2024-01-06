const { check } = require("express-validator");

const validateRegister = [
    check("name").notEmpty().withMessage("Debes ingresar un nombre").bail()
                .isLength({min: 5,max: 20}).withMessage("El nombre debe contener entre 5 y 20 caracteres").bail(),
    check("lasName").notEmpty().withMessage("Debes ingresar un apellido").bail()
                .isLength({min: 5,max: 20}).withMessage("El apellido debe contener entre 5 y 20 caracteres").bail(),
    check("email").notEmpty().withMessage("Debes ingresar un email").bail()
                .isEmail().withMessage("Debes ingresar un email con formato valido"),
    check("password").notEmpty().withMessage("Debes ingresar una contraseña").bail()
                .isLength({min: 5}).withMessage("La contraseña debe tener minimo 5 caracteres")
                .matches(/[A-Z]/).withMessage("La contraseña debe tener al menos una letra mayuscula")

];

module.exports = validateRegister