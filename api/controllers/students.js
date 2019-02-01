'use strict';
const Sequelize = require('sequelize');
const {client} = require('pg');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/backend');
const models = require('../models');

//Funcion autenticar
function Student(req,res){
    const param = req.body;
    const rut = params.rut;
    const apiKey = params.apiKey;

    sequelize.query(`SELECT a1.birthdate, a1.first_name AS "firstName",(CASE WHEN a1.gender =0 THEN 'FEMENINO' ELSE 'MASCULINO' END) AS gender, a1.last_name AS "lastName", 
    a1.rut FROM students a1 INNER JOIN TOKENS a2 on a1.rut = a2.rut WHERE a2.rut = ${rut}`, { type: Sequelize.QueryTypes.SELECT })

    .then(student =>{
        //Si no coindicen los resultados con lo socilitado, se entrega error 400
        if (student==''){
            res.status(400).send({message: "Alumno inexistente"});
        }

        //Si se obtienen resultados
        else{
            //Si se encuentra al estudiante, se entrega respuesta 200
            if(params.apiKey = apiKey){
                res.status(200).send(student);
            }
            //Sino, se entrega error 404
            else{
                res.status(404).send({message: "Página no encontrada"})
            }
        }
    })

    //Si no se logra conexión, existe error 500
    .catch(err=>{
        res.status(500).send(err);
    })
}

function regression(req, res) {
    res.status(200).send({message: "all right"});
}

// Exportando las funciones para que se puedan ver
// desde los modulos que llaman a los controladores.
// Si las funciones no estan dentro de este objeto entonces no son
// visibles para quien use los controladores.
module.exports = {
    regression: regression
}