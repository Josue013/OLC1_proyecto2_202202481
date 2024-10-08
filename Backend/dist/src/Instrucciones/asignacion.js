"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Instruccion_1 = require("./Instruccion");
class Asignacion extends Instruccion_1.Instruccion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }
    ejecutar(entorno) {
        const simbolo = entorno.obtenerVariable(this.id);
        if (simbolo) {
            if (simbolo.esConstante) {
                throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
            }
            const nuevoValor = this.expresion.calcular(entorno);
            if (nuevoValor.tipoDato !== simbolo.obtenertipoDato()) {
                throw new Error(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`);
            }
            simbolo.setValor(nuevoValor);
            simbolo.actualizarValor(nuevoValor);
            entorno.actualizarSimbolo(this.id, simbolo);
            console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        }
        else {
            throw new Error(`La variable ${this.id} no existe`);
        }
    }
}
exports.Asignacion = Asignacion;
