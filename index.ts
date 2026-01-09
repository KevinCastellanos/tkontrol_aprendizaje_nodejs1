// import { Router } from 'express';
import Server from './classes/server.js';
import router from './routes/router.js'
import bodyParser from 'body-parser';
import cors from 'cors';



const server = new Server();

//BodyParser
server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

//CORS
server.app.use ( cors({ origin: true, credentials: true }));



//Rutas de servicioas
server.app.use('/', router);


server.start(() => {
    console.log(`Servidor corriendo en el puerto ${ server.port}`)
});
