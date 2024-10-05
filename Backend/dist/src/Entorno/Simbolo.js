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
        if (v.tipoDato != this.tipoDato)
            throw Error("Verificar tipos de dato en la asignación de: " + this.id);
        this.valor = v.valor;
    }
}
exports.Simbolo = Simbolo;
