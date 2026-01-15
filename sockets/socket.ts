import type { Socket } from 'socket.io';
import { Server } from   'socket.io'


export const desconectar = ( cliente: Socket) => {

    cliente.on('disconnect' , () => {
        console.log('Cliente desconectado');
    });

}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: Server) => {

    cliente.on(' mensaje ', (payload: { de: string, cuerpo: string }) => {
  
        console.log('Mensaje recibido', payload );

        io.emit('mensaje-nuevo', payload);
    });

}







// // // DETECTA CUANDO INGRESA, CUANDO SALE Y LO REGISTRA EN DATA :HISTORIAL.TXT 
// // //PARA OCUPAR SE DESCOMENTA Y TAMBIEN SE DESCOMENTAREA UNA LINEA 
// // EN SERVER.TS
//          //////   socket.conectarCliente(cliente);



// import  type { Socket } from 'socket.io';
// import { Server } from 'socket.io';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url'; // Necesario para ES Modules

// // Configuración de rutas absoluta para ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Objeto para rastrear tiempos de conexión
// const clientesConectados: { [id: string]: Date } = {};

// /*
//   Registra la conexión del cliente y guarda su ID en el historial
//  */
// export const conectarCliente = (cliente: Socket) => {
//     const inicio = new Date();
//     clientesConectados[cliente.id] = inicio;
    
//     const log = `ACCIÓN: Cliente Conectado | ID: ${cliente.id} | Fecha: ${inicio.toLocaleString()}\n`;
//     escribirEnArchivo(log);
//     console.log(`Cliente conectado: ${cliente.id}`);
// };

// /*
//   Escucha la desconexión, calcula el tiempo y lo registra 
//  */
// export const desconectar = (cliente: Socket) => {
//     cliente.on('disconnect', () => {
//         const fin = new Date();
//         const inicio = clientesConectados[cliente.id];
        
//         if (inicio) {
//             const duracion = calcularTiempo(inicio, fin);
//             const log = [
//                 `ACCIÓN: Cliente Desconectado`,
//                 `ID: ${cliente.id}`,
//                 `Inicio: ${inicio.toLocaleString()} | Fin: ${fin.toLocaleString()}`,
//                 `Tiempo total: ${duracion}`,
//                 `------------------------------------------------`
//             ].join('\n') + '\n';
                
//             escribirEnArchivo(log);
//             delete clientesConectados[cliente.id];
//             console.log(`Cliente desconectado: ${cliente.id}. Duración: ${duracion}`);
//         }
//     });
// };

// /*
//   Escucha el evento 'mensaje' y reenvía el ID del cliente junto con el cuerpo
//  */
// export const mensaje = (cliente: Socket, io: Server) => {
//     // Escuchamos el evento 'mensaje' (sin espacios extras)
//     cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        
//         // Creamos un nuevo objeto que incluya el ID generado por el Socket
//         const mensajeConId = {
//             ...payload,
//             id: cliente.id // Aquí capturamos el ID de Angular/Socket.io
//         };

//         console.log('Mensaje recibido de:', cliente.id, payload);

//         // Emitimos a todos con el ID incluido
//         io.emit('mensaje-nuevo', mensajeConId);
//     });
// };

// // --- Funciones de Utilidad ---

// const calcularTiempo = (inicio: Date, fin: Date): string => {
//     const msec = fin.getTime() - inicio.getTime();
//     const hh = Math.floor(msec / 1000 / 60 / 60);
//     const mm = Math.floor((msec / 1000 / 60) % 60);
//     const ss = Math.floor((msec / 1000) % 60);
//     return `${hh}h ${mm}m ${ss}s`.trim();
// };

// const escribirEnArchivo = (contenido: string) => {
//     try {
//         const rutaDirectorio = path.resolve(__dirname, '../../data'); 
//         const rutaArchivo = path.join(rutaDirectorio, 'historial.txt');

//         if (!fs.existsSync(rutaDirectorio)) {
//             fs.mkdirSync(rutaDirectorio, { recursive: true });
//         }
//         fs.appendFileSync(rutaArchivo, contenido, 'utf8');
//     } catch (error) {
//         console.error('ERROR AL ESCRIBIR HISTORIAL:', error);
//     }
// };