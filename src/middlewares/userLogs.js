const fs = require('fs');
const path = require('path');

const logs = path.join(__dirname, '../logs/logs.txt'); 

function userLogs(req, res, next) {
const ingresoUrl= `el ususario ingreso a la ruta: ${req.url} \n`
fs.appendFileSync(logs, ingresoUrl);
    
    next();
    
}


module.exports = userLogs 


