var {Client}=require('pg');
const configuracion={
    user:'postgres',
    password:'1234',
    host:'localhost',
    database:'Biblioteca',
    port:5432
}
var cliente=new Client(configuracion);
async function conectar(){
    await cliente.connect();
}
conectar();
cliente.query('SELECT * FROM "Libros"',function(error,resultado){
    console.log(resultado);
    cliente.end(); 
})

resultado.rows.map(libro=>console.log(libro.Nombre)