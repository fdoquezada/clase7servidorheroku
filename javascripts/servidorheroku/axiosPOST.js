//1.- importar el módulo (default es para que vs cargue la documentacion y el autocompletar)
var axios = require('axios').default;

//2.-crear el objeto que vamos a insertar en la BD de la API
var usuario={
    name:'denis',
    email:'pachinx@gmail.com'
}

var config={
    headers:{
        'content-type':'application/json'
    }
}

//https://reqres.in/api/users
//3.-crear función asíncrona para enviar un post
async function crearUsuario(){
    axios.post()
    let respuesta= await axios.post('https://reqres.in/api/users',usuario,config);
    console.log("código:" + respuesta.status);
    console.log("status:" + respuesta.statusText);
    console.log("datos");
    console.log(respuesta.data);
}
//ejecutar la función.
crearUsuario();