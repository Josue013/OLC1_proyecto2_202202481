import { Request, Response } from "express";
import express from "express";
import cors from "cors";

import { AST } from "./src/AST/AST"



const gramatica = require("../Gramatica/gramatica.js")



const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const { exec } = require('child_process');
const path = require('path');

/* 
function generarReporteHTML(){
  console.log(Errores)
  return Errores
}
*/

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/json", (req: Request, res: Response) => {
  const parametro = req.body["parametro1"];
  console.log(parametro);
  res.json({"mensaje":"Hola "+parametro})
});

app.post('/interpretar', (req:Request, res:Response) => {
  const parametro = req.body["value"]; 
  const ast: AST = gramatica.parse(parametro) // Retorno de init
  console.log(ast)
  const retorno =  ast.interpretar()
  //Errores = ast.generarReporteHTML()

  res.json({"mensaje":retorno})
})

// Nuevo endpoint para generar y abrir el reporte del AST
app.get('/open-ast', (req: Request, res: Response) => {
  const ast = new AST([],[]); // Aquí deberías pasar las instrucciones necesarias
  ast.generarReporteAST();

  const filePath = path.join(__dirname, '../../FRONTEND/public/AST.pdf');
  exec(`start brave "${filePath}"`, (err: Error | null) => {
    if (err) {
      console.error('Error al abrir el archivo con Brave:', err);
      return res.status(500).send('Error al abrir el archivo con Brave');
    }
    res.send('Archivo AST abierto con Brave');
  });
});


app.get('/open-report', (req, res) => {
  const filePath = path.join(__dirname, '../../FRONTEND/public/Errores.html');
  exec(`start brave "${filePath}"`, (err: Error | null) => {
      if (err) {
          console.error('Error al abrir el archivo con Edge:', err);
          return res.status(500).send('Error al abrir el archivo con Edge');
      }
      res.send('Archivo abierto con Edge');
  });
});

app.get('/errores', (req:Request, res:Response) => {
  //const errores = generarReporteHTML()
  //res.json({result: errores})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});