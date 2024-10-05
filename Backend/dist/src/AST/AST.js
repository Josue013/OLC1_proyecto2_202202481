"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AST = void 0;
exports.imprimir = imprimir;
const Entorno_1 = require("../Entorno/Entorno");
let consola = "";
class AST {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
    }
    interpretar() {
        consola = ""; // Limpiar la consola antes de cada interpretación
        const entornoGlobal = new Entorno_1.Entorno(null);
        for (const instruccion of this.instrucciones) {
            try {
                instruccion.ejecutar(entornoGlobal);
            }
            catch (error) {
                console.error(error);
            }
        }
        return consola;
    }
}
exports.AST = AST;
function imprimir(valor) {
    consola += valor + "\n";
}
