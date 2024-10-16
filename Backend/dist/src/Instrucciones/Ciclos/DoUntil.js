"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoUntil = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Return_1 = require("../Return");
class DoUntil extends Instruccion_1.Instruccion {
    constructor(instrucciones, condicion, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(entorno) {
        let cond = this.condicion.calcular(entorno);
        if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
            throw new Error("La condición no es booleana");
        }
        do {
            const transfer = this.instrucciones.ejecutar(entorno); // Declarar transfer como any
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break;
                }
                else if (transfer instanceof Continue_1.Continue) {
                    cond = this.condicion.calcular(entorno); // Recalcular la condición después de continue
                    continue;
                }
                else if (transfer instanceof Return_1.Return) {
                    return transfer;
                }
                else {
                    throw new Error("Error en While");
                }
            }
            cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración
            // Verificar que la condición siga siendo de tipo booleano después de cada iteración
            if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
                throw new Error("La condición no es booleana");
            }
        } while (cond.valor === false);
    }
}
exports.DoUntil = DoUntil;
