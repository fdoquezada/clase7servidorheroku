const { Console } = require("console");

var axios=require("axios").default;

async function coneccionFalsa(){
    try{
    //let respuesta = await axios.get('https://conexionfalsa.com/password');
    let respuesta = await axios.get('https://pokeapi.com/api/v2/pokemon/25');
    console.log(respuesta.status);
    console.log(respuesta.data);
    }catch(err){
        console.log(err.message);
        throw "no se ṕueod ejecutar tu consulta";
    }finally{
        console.log("fin");
    }
    
}

coneccionFalsa();