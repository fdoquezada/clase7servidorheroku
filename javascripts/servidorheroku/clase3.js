//imprtar librerias o módulos
const {Client,Pool}=require('pg');
const express = require('express')
require('dotenv').config()


//crear configuracion
const port = 8081


const configuracion={
    host:process.env.PGHOST,
    port:process.env.PGPORT,
    database:process.env.PGDATABASE,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
    max:20, //conexiones maximas del pool
    idleTimeoutMillis: 3000, //tiempo de espera
    connectionTimeoutMillis: 2000, //tiempo de desconexion
}
//inicializacion
const pool=new Pool(configuracion);
const app = express()





 //generar codigo para buscar libros en la bd
app.get('/libros', (req, res) => {
    const consulta='SELECT 1."Nombre" AS "libros",a."Nombre" AS "Autor", 1."Edicion" FROM "libros" 1 JOIN "Autores a ON 1."IdAutor"=a."Id"'
    let resultado;
    try{
        resultado=await pool.query(consulta);
        let response={respuesta:resultado.row};
        res.send(JSON.stringify(response));
    }catch(err){
        console.log(`Error al ejecutar consulta : ${err.message}`);
        res.status(500);
        res.end('error al buscar datos');
    }
 
});



app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))