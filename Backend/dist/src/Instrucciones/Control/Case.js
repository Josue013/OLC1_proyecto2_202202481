"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("../Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(cond, ins, line, column) {
        super(line, column);
        this.cond = cond;
        this.ins = ins;
    }
    ejecutar(entorno) {
        for (const instruccion of this.ins) {
            try {
                const cs = instruccion.ejecutar(entorno);
                if (cs != null || cs != undefined) {
                    return cs;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.Case = Case;
