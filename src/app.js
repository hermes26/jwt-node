const express = require('express');
const app = express();

app.use(express.json());//nuestro servvidor es capaz de leer los archivos json. asi que cuando envio un json al servidor, el es capaz de convertirlo en un objeto javascript
app.use(express.urlencoded({extended:false}));//nuestro servidor es ahora capaz de entender datos enviador por un formulario y convertirlo en objetos de javascript


module.exports = app;