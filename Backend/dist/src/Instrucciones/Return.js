"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("./Instruccion");
class Return extends Instruccion_1.Instruccion {
    constructor(line, column, valor) {
        super(line, column);
        this.valor = valor;
        this.valor = valor;
    }
    ejecutar(entorno) {
        if (this.valor != null) {
            const exp = this.valor.calcular(entorno);
            console.log(exp);
            return exp;
        }
        else {
            return null;
        }
    }
}
exports.Return = Return;
