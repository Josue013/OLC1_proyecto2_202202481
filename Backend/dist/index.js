"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const gramatica = require("../Gramatica/gramatica.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
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
app.get('/errores', (req, res) => {
    //const errores = generarReporteHTML()
    //res.json({result: errores})
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
