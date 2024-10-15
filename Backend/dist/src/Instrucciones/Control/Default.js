"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Return_1 = require("../Return");
class Default extends Instruccion_1.Instruccion {
    constructor(ins, line, column) {
        super(line, column);
        this.ins = ins;
    }
    ejecutar(entorno) {
        for (const instruccion of this.ins) {
            try {
                const cs = instruccion.ejecutar(entorno);
                if (cs != null || cs != undefined) {
                    if (cs instanceof Break_1.Break) {
                        break;
                    }
                    else if (cs instanceof Return_1.Return) {
                        return cs;
                    }
                    else {
                        throw new Error("Error en Case");
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.Default = Default;
