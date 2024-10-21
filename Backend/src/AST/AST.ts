import Contador from "../Entorno/Contador";
import { Entorno } from "../Entorno/Entorno";
import { Error_ } from "../Error/Errores_";
import { Declaracion } from "../Instrucciones/Declaracion";
import { Ejecutar } from "../Instrucciones/Ejecutar";
import { Funcion } from "../Instrucciones/Funcion";
import { Instruccion } from "../Instrucciones/Instruccion";
import { Vector1 } from "../Instrucciones/Vector1";
import { Vector2 } from "../Instrucciones/Vector2";
import * as fs from 'fs';
import { exec } from 'child_process';
import { ModificarVector } from "../Instrucciones/ModificarVector";
import { Asignacion } from "../Instrucciones/asignacion";
import { AccesoVector } from "../Expresiones/AccesoVector";
import { Acceso } from "../Expresiones/Acceso";
import { Simbolo } from "../Entorno/Simbolo";
import { TablaSimbolos } from "../Error/TablaSimbolos";

let consola = "";
let errores : Error_[] = [];
export let simbolos : TablaSimbolos[] = [];
let AstDot: string;


export class AST {
    public tError: Error_[]
    constructor(private instrucciones:Instruccion[], errorS:Error_[]){
        this.instrucciones = instrucciones;
        this.tError = errorS;
    }
    interpretar(){
        consola = ""; // Limpiar la consola antes de cada interpretación
        errores = []; // Limpiar los errores antes de cada interpretación
        AstDot = ""; // Limpiar el AST antes de cada interpretación


        

        const entornoGlobal = new Entorno(null);

        // primera pasada para declarar funciones y variables
        this.instrucciones.forEach(instruccion => {
            if (instruccion instanceof Funcion || instruccion instanceof Declaracion || instruccion instanceof Vector1 || instruccion instanceof Vector2 || instruccion instanceof ModificarVector || instruccion instanceof Asignacion || instruccion instanceof AccesoVector || instruccion instanceof Acceso) {
                instruccion.ejecutar(entornoGlobal);
            }
        });

        // segunda pasada para ejecutar las instrucciones
        for (const instruccion of this.instrucciones) {
            if (instruccion instanceof Ejecutar) {
                instruccion.ejecutar(entornoGlobal);
                break;
            }
        }

        let contador = Contador.getInstancia();
        let cadena = "digraph ast{\n"
        cadena += "nINICIO[label=\"INICIO\"];\n"
        cadena += "nINSTRUCCIONES[label=\"INSTRUCCIONES\"];\n"
        cadena += "nINICIO->nINSTRUCCIONES;\n"

        this.instrucciones.forEach(instruccion => {
            let nodo = `n${contador.get()}`;
            cadena += `${nodo}[label="Instruccion"];\n`
            cadena += `nINSTRUCCIONES->${nodo};\n`
            cadena += instruccion.getAST(nodo);
        });
        cadena += "}\n"
        AstDot = cadena;
        
        // Agregar todos los errores léxicos
        this.tError.forEach(error => {
            agregarError(error);
        });

        console.log(errores.toString());
        this.generarReporteErrores();
        this.generarReporteAST();
        this.generarReporteSimbolos();
        return consola; 
    }

    

    public generarReporteAST() {
        const dotPath = 'C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/AST.dot';
        const pdfPath = 'C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/AST.pdf';

        // Escribir el contenido de AstDot en un archivo .dot
        fs.writeFileSync(dotPath, AstDot, 'utf8');

        // Ejecutar el comando de Graphviz para generar el archivo PDF
        exec(`dot -Tpdf ${dotPath} -o ${pdfPath}`, (error, stdout, stderr) => {
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

    public generarReporteSimbolos() {
        let htmlContent = `<html>
        <head>
            <title>Reporte de Símbolos</title>
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
            <h2>Reporte de Símbolos</h2>
            <table>
                <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Tipo2</th>
                    <th>Línea</th>
                    <th>Columna</th>
                </tr>`;

        simbolos.forEach((simbolo, index) => {
            htmlContent += `<tr>
                <td>${index + 1}</td>
                <td>${simbolo.id}</td>
                <td>${simbolo.tipo}</td>
                <td>${simbolo.tipo2}</td>
                <td>${simbolo.linea}</td>
                <td>${simbolo.columna}</td>
            </tr>`;
        });

        htmlContent += `</table>
        </body>
        </html>`;

        console.log("generando reporte de símbolos");
        fs.writeFileSync('C:/Users/PC/Desktop/PROYECTO2/OLC1_Proyecto2_202202481/FRONTEND/public/Simbolos.html', htmlContent, 'utf8');
    }

    public generarReporteErrores() {
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
export function imprimir(valor:any){
    consola += valor +"\n"
}

export function agregarError(valor:Error_){
    errores.push(valor);
}

