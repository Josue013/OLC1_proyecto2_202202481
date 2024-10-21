"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Basico = void 0;
const Tipos_1 = require("./Tipos");
const Expresion_1 = require("./Expresion");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
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
    getAST(last) {
        let counter = Contador_1.default.getInstancia();
        let basicoNode = `n${counter.get()}`;
        let valueNode = `n${counter.get()}`;
        let result = `${basicoNode}[label="Basico"];\n`;
        result += `${valueNode}[label="${this.valor}"];\n`;
        result += `${basicoNode} -> ${valueNode};\n`;
        result += `${last} -> ${basicoNode};\n`;
        return result;
    }
}
exports.Basico = Basico;
