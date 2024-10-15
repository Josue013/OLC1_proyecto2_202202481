import { Request, Response } from "express";
import express from "express";
import cors from "cors";

import { AST } from "./src/AST/AST"
import { Reportes } from "./src/Listas/Reportes"

const gramatica = require("../Gramatica/gramatica.js")



const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

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

app.get('/errores', (req:Request, res:Response) => {
  //const errores = generarReporteHTML()
  //res.json({result: errores})
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});