var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');


app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    //tipos de coleccion
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: { message: ' Tipo de coleccion no es valida' }
        });


    }

    if (!req.files) {
        return res.status(500).json({
            ok: false,
            mensaje: 'No a seleccionado nada',
            errors: { message: ' Debe de seleccionar una imagen' }
        });

    }

    //obtener nombre dle archivo 
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if ((extensionesValidas.indexOf(extensionArchivo) < 0)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensiones no valida',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }
    // Nombre personalizado de archivo 

    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;

    //mover el archivo temporal a un path
    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, path, res);

        /*res.status(200).json({
            ok: true,
            mensaje: 'Archivo guardado'
        });*/
    });

});

function subirPorTipo(tipo, id, nombreArchivo, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Usuario no existe',
                    errors: err
                });
            }
            //usuario.img hace referencia a la ruta vieja de la imagen
            //si existe elimina la imagen anterior
            if (fs.existsSync(usuario.img)) {
                fs.unlink(usuario.img);
            }
            usuario.img = nombreArchivo;
            usuario.save((err, usuarioActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });
            });

        });

    }
    if (tipo === 'medicos') {
        Medico.findById(id, (err, medico) => {

            if (!medico) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Medico no existe',
                    errors: err
                });
            }

            //usuario.img hace referencia a la ruta vieja de la imagen
            //si existe elimina la imagen anterior
            if (fs.existsSync(medico.img)) {
                fs.unlink(medico.img);
            }
            medico.img = nombreArchivo;
            medico.save((err, medicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de medico actualizada',
                    usuario: medicoActualizado
                });
            });

        });

    }
    if (tipo === 'hospitales') {
        Hospital.findById(id, (err, hospital) => {


            if (!hospital) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'hospital no existe',
                    errors: err
                });
            }
            //usuario.img hace referencia a la ruta vieja de la imagen
            //si existe elimina la imagen anterior
            if (fs.existsSync(hospital.img)) {
                fs.unlink(hospital.img);
            }
            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de medico actualizada',
                    usuario: hospitalActualizado
                });
            });

        });
    }

}

module.exports = app;