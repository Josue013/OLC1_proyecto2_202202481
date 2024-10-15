"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
class Ternario extends Expresion_1.Expresion {
    constructor(condicion, instruccionV, instruccionF, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instruccionV = instruccionV;
        this.instruccionF = instruccionF;
    }
    calcular(entorno) {
        const condicion = this.condicion.calcular(entorno); // Calcula el valor de la condición
        // Verifica que el tipo de dato de la condición sea booleano
        if (condicion.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
            throw new Error("La condición no es booleana");
        }
        // Si la condición es verdadera, calcula y retorna el valor de instruccionV
        if (condicion.valor) {
            return this.instruccionV.calcular(entorno);
        }
        else {
            // Si la condición es falsa, calcula y retorna el valor de instruccionF
            return this.instruccionF.calcular(entorno);
        }
    }
}
exports.Ternario = Ternario;
