"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Entorno_1 = require("../../Entorno/Entorno");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Return_1 = require("../Return");
class For extends Instruccion_1.Instruccion {
    constructor(Declaracion, cond, incremento, instrucciones, linea, columna) {
        super(linea, columna);
        this.Declaracion = Declaracion;
        this.cond = cond;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        const nuevoEntorno = new Entorno_1.Entorno(entorno);
        this.Declaracion.ejecutar(nuevoEntorno);
        let cond = this.cond.calcular(nuevoEntorno);
        // Verificar que la condición sea de tipo booleano
        if (cond.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
            throw new Error("La condición del bucle for debe ser de tipo booleano");
        }
        while (cond.valor === true) {
            const transfer = this.instrucciones.ejecutar(nuevoEntorno); // Declarar transfer como any
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break;
                }
                else if (transfer instanceof Continue_1.Continue) {
                    this.incremento.ejecutar(nuevoEntorno);
                    cond = this.cond.calcular(nuevoEntorno);
                    continue;
                }
                else if (transfer instanceof Return_1.Return) {
                    return transfer;
                }
                else {
                    throw new Error("Error en For");
                }
            }
            this.incremento.ejecutar(nuevoEntorno);
            cond = this.cond.calcular(nuevoEntorno);
            // Verificar que la condición siga siendo de tipo booleano después del incremento
            if (cond.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
                throw new Error("La condición del bucle for debe ser de tipo booleano");
            }
        }
    }
}
exports.For = For;
