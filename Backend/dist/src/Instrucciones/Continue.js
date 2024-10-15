"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Instruccion_1 = require("./Instruccion");
class Continue extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    ejecutar(entorno) {
        return this;
    }
}
exports.Continue = Continue;
