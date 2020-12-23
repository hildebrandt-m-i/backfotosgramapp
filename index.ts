import Server from './classes/server';
import userRoutes from './routes/usuario';

import cors from 'cors';

import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import postRoutes from './routes/post';

const server = new Server();

// Body-parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// fileUpload
server.app.use( fileUpload() );

// Configurar CORS
server.app.use( cors( { origin: true, credentials: true } ) );

// Rutas
server.app.use( '/user', userRoutes );
server.app.use( '/posts', postRoutes );

mongoose.connect( 'mongodb://localhost:27017/fotosgram', 
                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, ( error ) => {
    if ( error ) throw error;
    console.log('Base de datos online ');
});

server.start( () => {
    console.log('Servidor corriendo en puerto ' + server.port);
});