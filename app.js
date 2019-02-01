const bodyParser = require('body-parser');
const express= require('express');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//Rutas
require('./Api/routes/students')(app);


//Cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methos');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Conexión
app.get('*', (req, res) => {
    res.status(200).send({ message: "Bienvenido" });
})


module.exports = app;
