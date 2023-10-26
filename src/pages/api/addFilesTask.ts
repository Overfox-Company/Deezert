import { AddFilesController } from "../../api/controllers";
import { NextApiRequest, NextApiResponse } from "next";
import bodyParser from 'body-parser';

// Configura body-parser para manejar solicitudes con un límite de tamaño de 50 MB
const jsonParser = bodyParser.json({ limit: '50mb' });
const urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: true });

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  jsonParser(req, res, function(err) {
    if (err) {
      // Maneja errores de análisis del cuerpo de la solicitud aquí
      res.status(400).send('Error en la solicitud');
      return;
    }

    // Resto del código de tu controlador
    AddFilesController(req, res);
  });
}
