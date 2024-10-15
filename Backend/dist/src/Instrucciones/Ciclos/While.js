"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWhile = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
class CWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        let cond = this.condicion.calcular(entorno);
        if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO)
            throw new Error("La condición no es booleana");
        while (cond.valor == true) {
            const transfer = this.instrucciones.ejecutar(entorno);
            if (transfer instanceof Break_1.Break)
                break;
            if (transfer instanceof Continue_1.Continue)
                continue;
            cond = this.condicion.calcular(entorno);
        }
    }
}
exports.CWhile = CWhile;
