"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AST_1 = require("./src/AST/AST");
const gramatica = require("../Gramatica/gramatica.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
const { exec } = require('child_process');
const path = require('path');
/*
function generarReporteHTML(){
  console.log(Errores)
  return Errores
}
*/
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/json", (req, res) => {
    const parametro = req.body["parametro1"];
    console.log(parametro);
    res.json({ "mensaje": "Hola " + parametro });
});
app.post('/interpretar', (req, res) => {
    const parametro = req.body["value"];
    const ast = gramatica.parse(parametro); // Retorno de init
    console.log(ast);
    const retorno = ast.interpretar();
    //Errores = ast.generarReporteHTML()
    res.json({ "mensaje": retorno });
});
// Nuevo endpoint para generar y abrir el reporte del AST
app.get('/open-ast', (req, res) => {
    const ast = new AST_1.AST([], []); // Aquí deberías pasar las instrucciones necesarias
    ast.generarReporteAST();
    const filePath = path.join(__dirname, '../../FRONTEND/public/AST.pdf');
    exec(`start brave "${filePath}"`, (err) => {
        if (err) {
            console.error('Error al abrir el archivo con Brave:', err);
            return res.status(500).send('Error al abrir el archivo con Brave');
        }
        res.send('Archivo AST abierto con Brave');
    });
});
app.get('/open-report', (req, res) => {
    const filePath = path.join(__dirname, '../../FRONTEND/public/Errores.html');
    exec(`start brave "${filePath}"`, (err) => {
        if (err) {
            console.error('Error al abrir el archivo con Edge:', err);
            return res.status(500).send('Error al abrir el archivo con Edge');
        }
        res.send('Archivo abierto con Edge');
    });
});
app.get('/errores', (req, res) => {
    //const errores = generarReporteHTML()
    //res.json({result: errores})
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
