"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Entorno_1 = require("../Entorno/Entorno");
const Instruccion_1 = require("./Instruccion");
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        const nuevoEntorno = new Entorno_1.Entorno(entorno);
        this.instrucciones.forEach(element => {
            element.ejecutar(nuevoEntorno);
        });
    }
}
exports.Bloque = Bloque;
