"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    ejecutar(entorno) {
        return this;
    }
}
exports.Break = Break;
