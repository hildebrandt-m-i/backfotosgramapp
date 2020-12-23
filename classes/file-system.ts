import { FileUpload } from '../interfaces/file-upload';

import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {

    constructor() {}

    guardarImagenTemporal( file: FileUpload, userId: string ) {
        
        return new Promise( ( resolve, reject ) => {
            
            const path = this.crearCarpetausuario( userId );
            const nombreArchivo = this.generarNombreUnico( file.name );
        
            file.mv( `${ path }/${ nombreArchivo }`, ( error: any ) => {
                if ( error ) {
                    reject( error );
                } else {
                    resolve(true);
                }
            });

        });

    }

    private generarNombreUnico( nombreOriginal: string ) {

        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length - 1];

        const idunico = uniqid();


        return `${ idunico }.${ extension }`;

    }

    private crearCarpetausuario( userId: string ) {
        
        const pathUser = path.resolve( __dirname, '../uploads', userId );
        const pathUserTemp = pathUser + '/temp';
        
        const exist = fs.existsSync( pathUser );

        if( !exist ) {
            fs.mkdirSync( pathUser );
            fs.mkdirSync( pathUserTemp );
        }

        return pathUserTemp;

    }

    imagenesDeTempHaciaPost( userId: string ) {

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp' );
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts' );
    
        if ( !fs.existsSync( pathTemp ) ) {
            return [];
        }

        if ( !fs.existsSync( pathPost ) ) {
            fs.mkdirSync( pathPost );
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId );

        imagenesTemp.forEach( imagen => {
            fs.renameSync( `${ pathTemp }/${ imagen }`, `${ pathPost }/${ imagen }` );
        });

        return imagenesTemp;

    }

    private obtenerImagenesEnTemp( userId: string ) {
        
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync( pathTemp ) || [];
    }

    getFotoUrl( userId: string, img: string ) {
        const pathFoto = path.resolve( __dirname, '../uploads/', userId, 'posts', img );
        
        const existe = fs.existsSync( pathFoto );
        if ( !existe ) {
            return path.resolve( __dirname, '../assets/original.jpg' );
        }

        return pathFoto;
    }

}