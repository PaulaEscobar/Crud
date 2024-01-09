
const { validationResult } = require('express-validator');

const userController = {
    formRegister: (req, res) => {
        res.render('register')  
    },


    register: (req, res) => {
        const errors = validationResult(req); 
    
        if (errors.isEmpty()) { //NO hay errores
        res.redirect('/')

        } else { //SI hay errores
            res.render('register', { errors: errors.mapped(), old: req.body });
            console.log('errors', errors.mapped());
        }
        }
}


module.exports = userController