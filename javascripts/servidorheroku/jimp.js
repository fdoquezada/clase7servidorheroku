/* var jimp=require("jimp");
https://i.pinimg.com/originals/81/3e/56/813e5649cbdcf60531effccae407397f.jpg
 */
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))