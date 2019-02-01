// const jwt = require('../jwt');

const db = require('../models');
const Students = db.students;

Students.findAll({})
.then(console.log)
const secret = 'xxxx';

function authenticate(req, res) {
    // Aca va la funcion para autenticar

    // consultar base de datos

    // existe? 

    // Contraseña correcta? junto con su rut?


}
    
module.exports = {
    authenticate
}