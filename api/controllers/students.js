const db = require('../models');
const reggresion = require('regression')

//Funcion busqueda de rut
/*function Student(req,res){
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

*/

function regression(req, res) {
    //inicializan variables
    const param=req.body;
    var rut = req.param.rut;
    var apiKey = req.header('apiKey')

    //Se normaliza rut, sin puntos ni digito verificador
    rut = rut.replace(/\./g, '');
    rut = rut.replace(/\-/g, '');
    rut = rut.substring(0,rut.length -1);  

    sequelize.query(`select promedio, stddev, year, birthdate,firstName, lastName,
	gender , rut, apiKey from
    (select round(avg(a2.grade),2)  as promedio, round(coalesce(stddev_samp(a2.grade),0),3) as stddev, a3.year as year, a1.first_name as firstName, a1.last_name as lastName,
	 (case when a1.gender=0 then 'FEMENINO' else 'MASCULINO' end )as gender, a1.rut as rut, a1.birthdate as birthdate, a4.apiKey as apiKey
    from students as a1 inner join finished_courses as a2 on a1.pk = a2.student_fk inner join courses as a3 on a2.course_fk = a3.pk inner join tokens a4
	 on a4.rut = a1.rut
    where a1.rut=${rut}
    group by a3.year, a1.first_name, a1.last_name, a1.gender, a1.rut, a1.birthdate, a4.apiKey) as nota
    group by nota.promedio, nota.stddev, nota.firstName, nota.year, nota.birthdate, nota.rut, nota.lastName, nota.gender, nota.apiKey
    order by year desc
`, { type: Sequelize.QueryTypes.SELECT })

    .then(student=>{
        //Si no existe el rut, se entrega mensaje correspondiente
        if(student==''){
            res.status(400).send({message: "El rut no corresponde"})
        }
        else{
            //Si existe, se separan los datos recolectados de la BD
            if(apiKey==student[0].apikey){
                var regresion=[]
                var jsonData = {data:[]}

                //Se insertan los datos segun perfil de año, el promedio y desviación correspondiente
                for(var i in student){
                    aux1.push(parseInt(student[i].year))
                    aux1.push(parseFloat(student[i].promedio))
                    query.push(aux1)
                    jsonData.data.push({
                        "year": parseInt(student[i].year),
                        "average": parseFloat(student[i].promedio),
                        "stddev": parseFloat(student[i].stddev)
                    })
                }
            
            //Mediante la función regression se realizan los calculos automáticos
            const resultado = regression.linear(query);

            //Pendiente
            jsonData["m"] = resultado.equation[0];

            //interseccion
            jsonData["n"] = resultado.equation[1]

            //interseccion
            jsonData["r2"] = parseFloat(resultado.r2);
            
            //Ecuacion de la regresion
            jsonData["equation"] = resultado.string
            
            //Se entrega por consola el resultado
            console.log(resultado);

            //Se envía el json correspondiente
            res.status(200).send(
                jsonData
            )}

            else{
                //Si no se completa ninguna operacion, es debido a que la página no fue encontrada
                res.status(404).send({message: "Pagina no encontrada o error de login"})
            }
        }
    })
    res.status(200).send({message: "all right"});
    db.sequelize.query(`SELECT * FROM students LIMIT 3`, { type: db.Sequelize.QueryTypes.SELECT })
    .then(student => {
        console.log(student);
    });
}

// Exportando las funciones para que se puedan ver
// desde los modulos que llaman a los controladores.
// Si las funciones no estan dentro de este objeto entonces no son
// visibles para quien use los controladores.
module.exports = {
    regression: regression
}