"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(id, valor, tipoDato, linea, columna) {
        this.id = id;
        this.valor = valor;
        this.tipoDato = tipoDato;
    }
    getValor() {
        return this.valor;
    }
    setValor(v) {
        if (v.tipoDato !== this.tipoDato) {
            throw new Error("Verificar tipos de dato en la asignación de: " + this.id);
        }
        console.log(`Asignando valor ${v.valor} a la variable ${this.id}`);
        this.valor = v.valor;
    }
    actualizarValor(valor) {
        this.valor = valor;
    }
    obtenertipoDato() {
        return this.tipoDato;
    }
}
exports.Simbolo = Simbolo;
