"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpAritmetico = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
class Aritmetica extends Expresion_1.Expresion {
    constructor(operador1, operador2, operador, linea, columna) {
        super(linea, columna);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.operador = operador;
    }
    calcular(entorno) {
        const exp1 = this.operador1.calcular(entorno);
        const exp2 = this.operador2.calcular(entorno);
        // suma 1 + 1   
        if (this.operador == OpAritmetico.SUMA) {
            const tipoDominante = DominanteSuma[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                return { valor: exp1.valor + exp2.valor, tipoDato: tipoDominante };
            if (tipoDominante == Tipos_1.TipoDato.STRING)
                return { valor: exp1.valor.toString() + exp2.valor.toString(), tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // resta 2 - 1
        if (this.operador == OpAritmetico.RESTA) {
            const tipoDominante = DominanteResta[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                return { valor: exp1.valor - exp2.valor, tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // producto 2 * 2
        if (this.operador == OpAritmetico.PRODUCTO) {
            const tipoDominante = DominanteProducto[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                return { valor: exp1.valor * exp2.valor, tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // division 2 / 2
        if (this.operador == OpAritmetico.DIVISION) {
            const tipoDominante = DominanteDivision[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                if (exp2.valor == 0)
                    throw new Error("No se puede dividir entre 0");
                else
                    return { valor: exp1.valor / exp2.valor, tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // potencia 2 ^ 2
        if (this.operador == OpAritmetico.POTENCIA) {
            const tipoDominante = DominantePotencia[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                return { valor: Math.pow(exp1.valor, exp2.valor), tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // raiz 2 $ 2
        if (this.operador == OpAritmetico.RAIZ) {
            const tipoDominante = DominanteRaiz[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                return { valor: Math.pow(exp1.valor, 1 / exp2.valor), tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        // modulo 2 % 2
        if (this.operador == OpAritmetico.MODULO) {
            const tipoDominante = DominanteModulo[exp1.tipoDato][exp2.tipoDato];
            if (tipoDominante == Tipos_1.TipoDato.ENTERO || tipoDominante == Tipos_1.TipoDato.DECIMAL)
                if (exp2.valor == 0)
                    throw new Error("No se puede dividir entre 0");
                else
                    return { valor: exp1.valor % exp2.valor, tipoDato: tipoDominante };
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`);
        }
        return { valor: null, tipoDato: Tipos_1.TipoDato.NULO };
    }
}
exports.Aritmetica = Aritmetica;
// Dominante de las sumas
const DominanteSuma = [
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.STRING],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.STRING],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.STRING],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.STRING, Tipos_1.TipoDato.STRING],
    [Tipos_1.TipoDato.STRING, Tipos_1.TipoDato.STRING, Tipos_1.TipoDato.STRING, Tipos_1.TipoDato.STRING, Tipos_1.TipoDato.STRING],
];
// Dominante de las restas
const DominanteResta = [
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
// Dominante de los productos
const DominanteProducto = [
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
// Dominante de las divisiones
const DominanteDivision = [
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
// Dominante de las potencias
const DominantePotencia = [
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
// Dominante de las raices
const DominanteRaiz = [
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
// Dominante de los modulos
const DominanteModulo = [
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.ENTERO, Tipos_1.TipoDato.DECIMAL, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO],
];
var OpAritmetico;
(function (OpAritmetico) {
    OpAritmetico[OpAritmetico["SUMA"] = 0] = "SUMA";
    OpAritmetico[OpAritmetico["RESTA"] = 1] = "RESTA";
    OpAritmetico[OpAritmetico["PRODUCTO"] = 2] = "PRODUCTO";
    OpAritmetico[OpAritmetico["DIVISION"] = 3] = "DIVISION";
    OpAritmetico[OpAritmetico["POTENCIA"] = 4] = "POTENCIA";
    OpAritmetico[OpAritmetico["RAIZ"] = 5] = "RAIZ";
    OpAritmetico[OpAritmetico["MODULO"] = 6] = "MODULO";
})(OpAritmetico || (exports.OpAritmetico = OpAritmetico = {}));
