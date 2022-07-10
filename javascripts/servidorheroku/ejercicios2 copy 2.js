var axios = require('axios');
var yargs = require('yargs');
var chalk =require('chalk');

async function obtenerPokemon(numero){
    let respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon/'+numero);            
    //console.log("tipos:"+ respuesta.data.types.map(t=>t.type.name));
    if(respuesta.data.types[0].type.name=='electric'){
        console.log(chalk.yellow.inverse("pokemon:"+ respuesta.data.name));     
    }else if(respuesta.data.types[0].type.name=='grass'){
        console.log(chalk.green.inverse("pokemon:"+ respuesta.data.name));     
    }else if(respuesta.data.types[0].type.name=='water'){
        console.log(chalk.blue.inverse("pokemon:"+ respuesta.data.name));     
    }else if(respuesta.data.types[0].type.name=='fire'){
        console.log(chalk.red.inverse("pokemon:"+ respuesta.data.name));     
    }
}

yargs.command({
    command:'traer_pokemon',
    describe:'comando que nos busca el nombre del pokemon según su id',
    builder:{
        id:{
            describe:'es el número del pokemon a buscar',
            type:'number'
        }
    },
    handler:function(args){
        obtenerPokemon(args.id);
    }
})
yargs.parse();