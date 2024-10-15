"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Expresion_1 = require("./Expresion");
class Acceso extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    calcular(entorno) {
        // VARIABLES
        const value = entorno.obtenerVariable(this.id);
        if (value != null) {
            return { valor: value.getValor().valor, tipoDato: value.tipoDato };
        }
        // VECTORES
        const vector = entorno.obtenerArreglo(this.id);
        if (vector != null) {
            return { valor: vector.id, tipoDato: vector.tipo };
        }
        throw new Error(`La variable o vector ${this.id} no existe`);
    }
}
exports.Acceso = Acceso;
