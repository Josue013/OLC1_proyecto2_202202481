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
        const variable = entorno.obtenerVariable(this.id);
        if (variable)
            return { valor: variable.getValor().valor, tipoDato: variable.tipoDato };
        throw Error("La variable no existe");
    }
}
exports.Acceso = Acceso;
