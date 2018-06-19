// Requires importacion de librerias 
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


//Inicializacion de variables
var app = express();


//body-parser
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/HospitalDB', (err, res) => {

    if (err) throw err;

    console.log('Base de datos: \x1b[32m%s\x1b[0m', ' online');
});

// IMportar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var loginRoutes = require('./routes/login');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');


// Rutas

app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, function() {
    console.log('Express server puerto 3000:\x1b[32m%s\x1b[0m', ' online');
});