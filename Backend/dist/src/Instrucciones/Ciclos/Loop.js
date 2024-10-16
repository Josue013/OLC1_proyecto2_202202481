"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = void 0;
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Return_1 = require("../Return");
class Loop extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        while (true) { // Bucle infinito
            const transfer = this.instrucciones.ejecutar(entorno); // Ejecutar las instrucciones
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break; // Salir del bucle si se encuentra un break
                }
                else if (transfer instanceof Return_1.Return) {
                    return transfer; // Retornar el valor si se encuentra un return
                }
                else if (transfer instanceof Continue_1.Continue) {
                    continue; // Continuar con la siguiente iteración si se encuentra un continue
                }
                else {
                    throw new Error("Error en Loop");
                }
            }
        }
    }
}
exports.Loop = Loop;
