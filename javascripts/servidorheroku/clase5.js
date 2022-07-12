//1 importar los modulos
const { default: chalk } = require('chalk');
const {sequelize, Sequelize}=require('sequelize');

//2. crear una conexion sequelize
const sequelize=new Sequelize("TestingSequelize","postgres","1234",{
    host:"localhost",
    dialect:"postgres"
});
 //probar que funcione y se conecte correstamante
 async function conectar(){
    try{
        await sequelize.authenticate();
        console.log(chalk.green.inverse("******** coneccion establecida lo lograste **************")); 
    }catch (error){
        console.log(chalk.red.inverse("Error en la coneccion algo fallo " + error.message));

    }
}
conectar();
