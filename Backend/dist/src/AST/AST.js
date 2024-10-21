"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
exports.imprimir = imprimir;
exports.agregarError = agregarError;
const Contador_1 = __importDefault(require("../Entorno/Contador"));
const Entorno_1 = require("../Entorno/Entorno");
const Declaracion_1 = require("../Instrucciones/Declaracion");
const Ejecutar_1 = require("../Instrucciones/Ejecutar");
const Funcion_1 = require("../Instrucciones/Funcion");
const Vector1_1 = require("../Instrucciones/Vector1");
const Vector2_1 = require("../Instrucciones/Vector2");
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
const ModificarVector_1 = require("../Instrucciones/ModificarVector");
const asignacion_1 = require("../Instrucciones/asignacion");
const AccesoVector_1 = require("../Expresiones/AccesoVector");
const Acceso_1 = require("../Expresiones/Acceso");
let consola = "";
let errores = [];
let AstDot;
class AST {
    constructor(instrucciones, errorS) {
        this.instrucciones = instrucciones;
        this.instrucciones = instrucciones;
        this.tError = errorS;
    }
    interpretar() {
        consola = ""; // Limpiar la consola antes de cada interpretación
        errores = []; // Limpiar los errores antes de cada interpretación
        AstDot = ""; // Limpiar el AST antes de cada interpretación
        const entornoGlobal = new Entorno_1.Entorno(null);
        // primera pasada para declarar funciones y variables
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Funcion_1.Funcion || instruccion instanceof Declaracion_1.Declaracion || instruccion instanceof Vector1_1.Vector1 || instruccion instanceof Vector2_1.Vector2 || instruccion instanceof ModificarVector_1.ModificarVector || instruccion instanceof asignacion_1.Asignacion || instruccion instanceof AccesoVector_1.AccesoVector || instruccion instanceof Acceso_1.Acceso) {
                instruccion.ejecutar(entornoGlobal);
            }
        });
        // segunda pasada para ejecutar las instrucciones
        for (const instruccion of this.instrucciones) {
            if (instruccion instanceof Ejecutar_1.Ejecutar) {
                instruccion.ejecutar(entornoGlobal);
                break;
            }
        }
        let contador = Contador_1.default.getInstancia();
        let cadena = "digraph ast{\n";
        cadena += "nINICIO[label=\"INICIO\"];\n";
        cadena += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n";
        cadena += "nINICIO->nINSTRUCCIONES;\n";
        this.instrucciones.forEach(instruccion => {
            let nodo = `n${contador.get()}`;
            cadena += `${nodo}[label="Instruccion"];\n`;
            cadena += `nINSTRUCCIONES->${nodo};\n`;
            cadena += instruccion.getAST(nodo);
        });
        cadena += "}\n";
        AstDot = cadena;
        // Agregar todos los errores léxicos
        this.tError.forEach(error => {
            agregarError(error);
        });
        console.log(errores.toString());
        this.generarReporteErrores();
        this.generarReporteAST();
        return consola;
    }
    generarReporteAST() {
        const dotPath = 'C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/AST.dot';
        const pdfPath = 'C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/AST.pdf';
        // Escribir el contenido de AstDot en un archivo .dot
        fs.writeFileSync(dotPath, AstDot, 'utf8');
        // Ejecutar el comando de Graphviz para generar el archivo PDF
        (0, child_process_1.exec)(`dot -Tpdf ${dotPath} -o ${pdfPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error al generar el PDF: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`PDF generado correctamente en ${pdfPath}`);
        });
    }
    generarReporteErrores() {
        let htmlContent = `<html>
        <head>
            <title>Reporte de Errores</title>
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
                tr:nth-child(even) {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h2>Reporte de Errores</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Línea</th>
                    <th>Columna</th>
                </tr>`;
        errores.forEach((error, index) => {
            htmlContent += `<tr>
                <td>${index + 1}</td>
                <td>${error.tipo}</td>
                <td>${error.descripcion}</td>
                <td>${error.linea}</td>
                <td>${error.columna}</td>
            </tr>`;
        });
        htmlContent += `</table>
        </body>
        </html>`;
        console.log("generando reporte de errores");
        fs.writeFileSync('C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/Errores.html', htmlContent, 'utf8');
    }
}
exports.AST = AST;
function imprimir(valor) {
    consola += valor + "\n";
}
function agregarError(valor) {
    errores.push(valor);
}
