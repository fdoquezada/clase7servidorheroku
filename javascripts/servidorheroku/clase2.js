var {Client}=require('pg');
const configuracion={
    user:'postgres',
    password:'1234',
    host:'localhost',
    database:'Biblioteca',
    port:5432
}
//3.- crear el cliente
//var cliente=new pg.Client() //se usa con var pg=require('pg');
var cliente=new Client(configuracion);
//4.- conectarse
async function conectar(){
    await cliente.connect();
}
conectar();

//5.- consulta directa con callback
cliente.query('SELECT * FROM "Libros"',function(error,resultado){
    //console.log(resultado);
    //cantidad de filas u objetos dentro del arreglo de filas
    console.log("cantidad de libros:" + resultado.rowCount);
    //cargar el primer libro
    console.log("primer libro:" + resultado.rows[0].Nombre);
    //cargar el libro n°20?
    console.log("libro 20:" + resultado.rows[19].Nombre);
    //cliente.end(); 
    console.log("--------------------------------------");
});

//consulta con filtro o valores
cliente.query('SELECT * FROM "Libros" WHERE "Edicion">2000',function(error,resultado){
    console.log("cantidad de libros:" + resultado.rowCount);
    // ejercicio 1: mostrar todos los nombre de los libros del resultado
    console.log("***************FOR******************");
    for(i=0;i<resultado.rows.length;i++){
        console.log(resultado.rows[i].Nombre);
    }
    console.log("***************MAP********************");
    //lo mismo pero mas barato
    resultado.rows.map(libro=>console.log(libro.Nombre));
    console.log("***************EACH*******************");
    //otra forma
    resultado.rows.forEach(libro=>console.log(libro.Nombre));
    
    console.log("--------------------------------------");
})
//ejercicio 2.- consultar desde libros todos los nombres y años de los libros que tengan mas de 500 páginas
// y su publicación sea anterior a 2000
cliente.query('SELECT "Nombre","Edicion" FROM "Libros" WHERE "Paginas">500 AND "Edicion"<2000', function(err,res){
    console.log("***************FOR******************");
    for(i=0;i<res.rows.length;i++){
        console.log(res.rows[i].Nombre + " : " + res.rows[i].Edicion);
    }
    console.log("***************MAP******************");
    res.rows.map(l=>console.log(l.Nombre + " : " +l.Edicion));
    console.log("--------------------------------------");
})


//ejercicio 3.- consultar los libros y sus autores (JOIN)
const consulta='SELECT l."Nombre" AS "Libro",a."Nombre" AS "Autor" FROM "Libros" l JOIN "Autores" a ON l."IdAutor"=a."Id" '
cliente.query(consulta + ' ORDER BY "Autor"',function(err,res){
    if(err){
        console.log("Error:");
        console.log(err.message);
    }else{
        res.rows.map(l=>console.log(l.Autor +" : "+l.Libro ));
        
    }
    console.log("--------------------------------------");
})

//ejerccio 4.- consultar todos los libros con su autor y año de edición.
//usando chalk, pintar los libros según su año: rojo antes de 1900,amarillo antes (o igual)del 2000, verde mayor al 2000
const chalk = require('chalk');
const consulta4='SELECT l."Nombre" AS "Libro",a."Nombre" AS "Autor",l."Edicion" FROM "Libros" l JOIN "Autores" a ON l."IdAutor"=a."Id" ORDER BY l."Edicion" '
cliente.query(consulta4,function(err,res){
   if(err){
    console.log("Error:" + err.message);
   }else{
    res.rows.map(l=>{
        let textoLibro=l.Libro + " - " + l.Autor + " - " +l.Edicion;
        if(l.Edicion<=1900){
            console.log(chalk.red(textoLibro));
        }else if(l.Edicion<=2000){
            console.log(chalk.yellow(textoLibro));
        }else{
            console.log(chalk.green(textoLibro));
        }        
    });
   }
   console.log("--------------------------------------");
});
cliente.query(consulta4,function(err,res){
    if(err){
        console.log("Error:"+err.message);
    }else{
        res.rows.filter(l=>l.Edicion<=1900).map(l=>console.log(chalk.red(l.Libro + " - " + l.Autor + " - " +l.Edicion)));
        res.rows.filter(l=>l.Edicion<=2000 && l.Edicion>1900).map(l=>console.log(chalk.yellow(l.Libro + " - " + l.Autor + " - " +l.Edicion)));
        res.rows.filter(l=>l.Edicion>200).map(l=>console.log(chalk.green(l.Libro + " - " + l.Autor + " - " +l.Edicion)));
    }
});





