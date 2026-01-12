
import express from 'express';
import { SERVER_PORT } from '../global/environment.js';
import { Server as socketIO  }  from 'socket.io';
import http from 'http';


export default class Server{
    public app: express.Application;
    public port: number;

    public io: socketIO;
    private httpServer: http.Server;

    private static _instance: Server; 



    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app);
        this.io = new socketIO( this.httpServer) ;

        this.escucharSockets();
    

    }

    public static get instance(){
        return this._instance || ( this._instance = new this());

    }


    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on( 'connection', cliente  => {

            console.log('Cliente conectado')       
            

        });
    }


    start(callback: () => void) {
        
        this.httpServer.listen( this.port, callback);

    }

}