//importar librerias o modulos
const {Client} = require('pg');
require('dotenv').config();

//crear configuracion 
const configuracion={
    host:process.env.PGHOST,
    port:process.env.PGHOST,
    database:process.env.PGHOST,
    user:process.env.PGUSER,
    password:process.env.PGUSER,
}