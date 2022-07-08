//imprtar librerias o módulos
const {Client,Pool}=require('pg');
require('dotenv').config();

//crear configuracion
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

//1.- consulta de prueba con CALLLBACK
const sql='SELECT * FROM "Libros"'
pool.query(sql,function(err,res){
    if(err){
        console.log("Error:"+err.message);
    }else{
        console.log("count 1 :" + res.rowCount);
        console.log("-------------------------------------");
    }
})

//2.- consulta SIN CALLBACK -- usar try-catch para capturar errores
async function ejecutarConsulta(){
    let respuesta= await pool.query('SELECT * FROM "Libros"');
    console.log("count 2 :"+respuesta.rowCount);
    console.log("-------------------------------------");
}
ejecutarConsulta();

///3.- consulta con parámetros
pool.query('SELECT * FROM "Libros" WHERE "Paginas">$1',[500],function(err,res){
    if(err){
        console.log("Error:"+err.message);
    }else{
        console.log("count 3 :" + res.rowCount);
        console.log("-------------------------------------");
    }
})
//4.-función asíncrona con parámetros
const query4='SELECT * FROM "Libros" WHERE "Paginas">$1 AND "Edicion">$2';
const parametros=[500,2000]
async function ejecutarConsulta4(){
    let respuesta= await pool.query(query4,parametros);
    console.log("count 4 :"+respuesta.rowCount);
    console.log("-------------------------------------");
}
ejecutarConsulta4();

//5.- query con objeto
const query5={
    text:'SELECT * FROM "Libros" WHERE "Paginas">$1 AND "Edicion">$2',
    values:[500,2000]
}
pool.query(query5,function(err,res){
    if(err){
        console.log("Error:"+err.message);
    }else{
        console.log("count 5 :" + res.rowCount);
        console.log("-------------------------------------");
    }
})

//ejercicios
//ejercicio 1.- 
//agregar un nuevo autor y 2 libros de su autoría.

//ejercicio 2
//obtener una lista donde se indique la cantidad de libros por género
const query_ej2='SELECT g."Nombre", COUNT(l."Id") FROM "Genero" g LEFT JOIN "Libros" l ON l."IdGenero"=g."Id" GROUP BY g."Nombre"'
pool.query(query_ej2,function(err,res){
    if(err){
        console.log("Error:"+ err.message);
    }else{
        console.table(res.rows);
    }
})
//ejercicio1 
//agregar un nuevo autor y 2 libros de sua autoria
//solucuion alexis

async function agregarAutor(id,Nombre,FechaNacimento,Nacionalidad){
    const query='INSERT INTO "AUTORES" VALUES (1,$2,$3,$4)';
    const parametros=[id,Nombre,FechaNacimiento,Nacionalidad];
    let respuesta=await pool.query(query,parametros);
    console.log("respuesta insert autor:" + respuesta);
    console.log ("****************")
}

