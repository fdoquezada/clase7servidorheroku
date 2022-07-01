/* var jimp=require("jimp");
https://i.pinimg.com/originals/81/3e/56/813e5649cbdcf60531effccae407397f.jpg
 */
const express = require('express')
const { nextTick } = require('process')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('prueba con express'))
app.get('/usuario', (req, res) => res.send('se ha cosnultado un usuario'))

app.post('/consultado', (req, res) => res.send('se ha cosnultado un post'))
//agregar una funcion que tenga parametros en la ruta 
app.get('/autor/:idAutor/libro/:idLibro', (req, res) => res.send("enviandodatos"))

//funcionalidad con dos callback
app.get('/comida', (req, res, next) => res.send("enviandodatos"))

app.get('/comida', (req, res, next) => res.send("enviandodatos"))
//archivos estaticos
app.use(express.static('public'));
app.get('/foto', (req, res, next) => res.send("<img src='img/descarga.jpeg' />"));

//leer jason



app.listen(port, () => console.log(`Server corriendo en  puerto  ${port}!`))

