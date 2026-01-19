import express from 'express';
import { SERVER_PORT } from '../global/environment.js';
import { Server as socketIO } from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket.js';

export default class Server {
    public app: express.Application;
    public port: number;
    public io: socketIO;
    private httpServer: http.Server;
    private static _instance: Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);

        // CONFIGURACIÓN DE CORS ÚNICA - Permite conexión desde Angular
        this.io = new socketIO(this.httpServer, {
            cors: {
                origin: "http://localhost:4200",
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {

            console.log(cliente.id);


            //Conectar Cliente
            socket.conectarCliente(cliente, this.io);

            // Configurar usuario
            socket.configurarUsuario( cliente, this.io); 


            //PARA PODER OCUPAR LA PARTE DE REGISTRO EN SOCKET.TS DESCOMENTAREA LA PARE DE ABAJO
            //socket.conectarCliente(cliente);

            //Esta linea de abajo era para ver cuando el cliente se conectaba pero cambio porque se va a pasar que se genere un listado.
            //console.log('Cliente conectado');

            // Manejadores de eventos de sockets
            socket.mensaje(cliente, this.io);

            //desconectar cliente
            socket.desconectar(cliente, this.io );

            
        });
    }

    start(callback: () => void) {
        this.httpServer.listen(this.port, callback);
    }
}





