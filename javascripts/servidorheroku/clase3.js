//importar librerias o módulos---------------------------------------------
const {Client,Pool}=require('pg');
const express = require('express');
require('dotenv').config();

//crear configuracion------------------------------------------------------
const port =4000

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

//inicializacion-----------------------------------------------------------
const pool=new Pool(configuracion);
const app = express()

//rutas--------------------------------------------------------------------
//obtener la lista de libros desde la bd


 //generar codigo para buscar libros en la bd
app.get('/libros', async (req, res) => {
    const consulta='SELECT l."Nombre" AS "Libro",a."Nombre" AS "Autor", l."Edicion" FROM "Libros" l JOIN "Autores" a ON l."IdAutor"=a."Id" '
    let resultado;
    try{
        resultado= await pool.query(consulta);
        let response={respuesta:resultado.rows};
        res.send(JSON.stringify(response));
    }catch(err){
        console.log(`Error al ejecutar consulta: ${err.message}`);//"Error al ejecutar consulta:" +err.message
        res.status(500);
        res.end('error al buscar datos');
    }
});



app.get('/', (req, res) => res.send('pagina de inicio'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))