
import express from 'express';
import { SERVER_PORT } from '../global/environment.js';
import { Server as socketIO  }  from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket.js';

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

           // CONFIGURACIÓN DE CORS AQUÍ:
        this.io = new socketIO(this.httpServer, {
        cors: {
            origin: "http://localhost:4200", // Permite el origen de Angular
            methods: ["GET", "POST"],         // Corregido: sin corchetes extra
            credentials: true

       }
        
    });   
    
    this.escucharSockets(); 

    }

    public static get instance(){
        return this._instance || ( this._instance = new this());

    }

    escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on( 'connection', cliente  => {

            console.log('Cliente conectado');  

            //hacer llamado directo para mostrar en servidor------------------>
            
            // cliente.on('disconnect', () => {
            //     console.log('Cliente Desconectado');
            // });


            //Mensajes
            socket.mensaje( cliente, this.io);

            //Desconectar
            socket.desconectar( cliente);
            
        });
        
    }

    start(callback: () => void) {
        
        this.httpServer.listen( this.port, callback);

    }

}