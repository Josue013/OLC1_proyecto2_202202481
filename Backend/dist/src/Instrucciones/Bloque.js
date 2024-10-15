"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Entorno_1 = require("../Entorno/Entorno");
const Instruccion_1 = require("./Instruccion");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        const nuevoEntorno = new Entorno_1.Entorno(entorno);
        for (const element of this.instrucciones) {
            try {
                const transfer = element.ejecutar(nuevoEntorno);
                if (transfer instanceof Break_1.Break)
                    return transfer;
                if (transfer instanceof Continue_1.Continue)
                    return transfer;
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}
exports.Bloque = Bloque;
