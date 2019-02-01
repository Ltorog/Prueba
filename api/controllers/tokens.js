// const jwt = require('../jwt');

const db = require('../models');
const Students = db.students;

const secret = 'xxxx';


function authenticate(req, res) {
    // Aca va la funcion para autenticar

    // consultar base de datos
    // Asi se consulta la base de datos con QUERY tipo RAW
    db.sequelize.query(`SELECT * FROM tokens LIMIT 3`, { type: db.Sequelize.QueryTypes.SELECT })
    .then(console.log);

    // existe? 

    // Contraseña correcta? junto con su rut?


}
    
module.exports = {
    authenticate
}