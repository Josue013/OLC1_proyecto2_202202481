"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basico = void 0;
const Tipos_1 = require("./Tipos");
const Expresion_1 = require("./Expresion");
class Basico extends Expresion_1.Expresion {
    constructor(valor, tipo, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.valor = valor;
    }
    calcular() {
        // Enteros
        if (this.tipo == Tipos_1.TipoDato.ENTERO)
            return { valor: parseInt(this.valor), tipoDato: this.tipo };
        // Decimales
        if (this.tipo == Tipos_1.TipoDato.DECIMAL)
            return { valor: parseFloat(this.valor), tipoDato: this.tipo };
        // Booleanos
        if (this.tipo == Tipos_1.TipoDato.BOOLEANO)
            if (this.valor.toLocaleLowerCase() == "true")
                return { valor: true, tipoDato: this.tipo };
            else
                return { valor: false, tipoDato: this.tipo };
        // Strings 
        if (this.tipo == Tipos_1.TipoDato.STRING)
            return { valor: this.valor.toString(), tipoDato: this.tipo };
        // Caracter
        if (this.tipo == Tipos_1.TipoDato.CHAR)
            return { valor: this.valor, tipoDato: this.tipo };
        // Nulo
        return { valor: null, tipoDato: Tipos_1.TipoDato.NULO };
    }
}
exports.Basico = Basico;
