const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');


const { check } = require('express-validator'); /////////////////

const validateRegister = [
check('first_name').notEmpty().withMessage('Debes completar el campo al menos con 3 caracteres').bail().isLength({ min:3, max:10}).withMessage('*debes completar al menos 3 caracteres*'),
check('last_name').notEmpty().withMessage('Debes completar el apellido').bail().isLength({ min:5, max:10}).withMessage('*El apellido debe tener al menos 5 caracteres*'),    
check('email').notEmpty().withMessage('Debes completar el email').bail().isEmail().withMessage('Debes ingresar un email válido'),
check('password').notEmpty().withMessage('Debes completar la contraseña').bail().isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

//http://localhost:3000/users/register

router.get('/register', userController.formRegister)

router.post('/register', validateRegister, userController.register)

module.exports = router