import jwt, { decode } from 'jsonwebtoken';

export default class Token {
    
    private static seed: string = 'esta-es-la-semilla-de-mi-app';
    private static caducidad: string = '30d';

    constructor(){}

    static getJwtToken( payload: any ): string {
        return jwt.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken( userToken: string ) {
        
        return new Promise( ( resolve, reject ) => {
            
            jwt.verify( userToken, this.seed, (error, decoded ) => {
                
                if (error) {
                    reject();    
                } else {
                    resolve( decoded );
                }
            })

        });
        
    }

}