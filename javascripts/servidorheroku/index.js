//server con express
//1 importar modulo
const { application } = require('express');
const express = require('express');
//2 crear o iniciar ña aplicacion express
const app = express();
//3craer variable con el puerto ;
const puerto =8081;// essto de podria cargar desde el archivo -env
//4 creacion de la funcion para un metodo 
application.get('/', function)
