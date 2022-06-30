var axios=require("axios").default;

async function coneccionFlasa(){
    try{
    let respuesta = await axios.get('https://conexionfalsa.com/password');
    console.log(respuesta.status);
    console.log(respuesta.data);
    }catch(err){
        console.log(err.message);
        throw "no se ṕueod ejecutar tu consulta";
    }
    
}

coneccionFlasa();