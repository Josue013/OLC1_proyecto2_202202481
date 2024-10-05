"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Echo = void 0;
const AST_1 = require("../AST/AST");
const Instruccion_1 = require("./Instruccion");
class Echo extends Instruccion_1.Instruccion {
    constructor(exp, linea, columna) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(entorno) {
        const exp1 = this.exp.calcular(entorno);
        console.log(exp1);
        (0, AST_1.imprimir)(exp1.valor);
    }
}
exports.Echo = Echo;
