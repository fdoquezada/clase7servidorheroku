//1.- importar el módulo axios
var axios=require('axios').default;

//2.- crear la función asíncrona
async function obtenerPokemon(numero){
    let respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon/'+numero);    
    console.log("codigo:" + respuesta.status);        
    console.log("pokemon:"+ respuesta.data.name);
    console.log(respuesta.data);
}
//3.- ejecutar la función
//obtenerPokemon(100);

//--------------------------------------------------------------------------
//version genérica alternativa que hace lo mismo que lo anterior.
let numero=100
axios({
    method:'get',
    url:'https://pokeapi.co/api/v2/pokemon/'+numero,
    responseType:'json'
}).then(function(respuesta){
    console.log(respuesta.data.name);
})