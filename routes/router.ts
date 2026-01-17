
import { Router, } from 'express';
import type { Request, Response } from 'express';
import Server from '../classes/server.js';

const router = Router();

router.get ('/mensajes', (req: Request, res: Response ) => {

    res.json({
        ok : true,
        mensaje: 'Todo esta bien!'
    });

});

//mensajes al general a traves de postman envia y se puede visualizar en el frontend del Angular
router.post('/mensajes', ( req: Request, res: Response) =>{

  const cuerpo = req.body.cuerpo;
  const de     = req.body.de;
  const payload = {cuerpo, de};

  const server = Server.instance;
  server.io.emit('mensaje-nuevo', payload);

  res.json({
      ok: true ,
      cuerpo,
      de
  })

});


//mensaje privado 
router.post ('/mensajes/:id', (req: Request, res: Response ) => {


    const cuerpo = req.body.cuerpo;
    const de  = req.body.de;
    const id = req.params.id;

     if (!id) {
    return res.status(400).json({
      ok: false,
      mensaje: 'ID es requerido'
    });
  }

    const payload = {
      de,
      cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit( 'mensaje-privado', payload);


    res.json({
        
        ok : true,
       cuerpo,
       de  ,
       id
    });

}); 



//numro agregado y tambien id que se almacena en historial.txt
// router.post('/mensajes', (req: Request, res: Response) => {
//   const { id, num, cuerpo, de } = req.body;

 
// // Si NO es BCA, no calcular factorial
//   if (id !== 'BCA') {
//     return res.json({
//       ok: true,
//       id,
//       cuerpo,
//       de,
//       mensaje: 'ID distinto de BCA, no se calcula factorial'
//     });
//   }

//  // Si ES BCA, calcular factorial
//   const n = Number(num);

//   if (!Number.isInteger(n) || n < 0) {
//     return res.status(400).json({
//       ok: false,
//       error: 'Número inválido'
//     });
//   }

//   let factorial = 1;
//   for (let i = 2; i <= n; i++) factorial *= i;

//   return res.json({
//     ok: true,
//     id,
//     cuerpo,
//     de,
//     num: n,
//     factorial
//   });
// });


 export default router;








