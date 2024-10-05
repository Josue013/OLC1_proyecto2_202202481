"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
class Relacional extends Expresion_1.Expresion {
    constructor(exp1, exp2, operador, linea, columna) {
        super(linea, columna);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operador = operador;
    }
    calcular(entorno) {
        const exp1 = this.exp1.calcular(entorno);
        const exp2 = this.exp2.calcular(entorno);
        const tipoBool = DominanteRelacional[exp1.tipoDato][exp2.tipoDato];
        if (tipoBool != Tipos_1.TipoDato.BOOLEANO)
            throw new Error("Verifique los tipos de datos para: " + this.operador);
        // igualdad
        if (this.operador == OperadorRelacional.IGUALDAD)
            return { valor: exp1.valor == exp2.valor, tipoDato: tipoBool };
        // distinto
        if (this.operador == OperadorRelacional.DISTINTO)
            return { valor: exp1.valor != exp2.valor, tipoDato: tipoBool };
        // menor
        if (this.operador == OperadorRelacional.MENOR)
            return { valor: exp1.valor < exp2.valor, tipoDato: tipoBool };
        // menor igual
        if (this.operador == OperadorRelacional.MENORIGUAL)
            return { valor: exp1.valor <= exp2.valor, tipoDato: tipoBool };
        // mayor
        if (this.operador == OperadorRelacional.MAYOR)
            return { valor: exp1.valor > exp2.valor, tipoDato: tipoBool };
        // mayor igual
        if (this.operador == OperadorRelacional.MAYORIGUAL)
            return { valor: exp1.valor >= exp2.valor, tipoDato: tipoBool };
        // error
        throw new Error("Verificar operador relacional");
    }
}
exports.Relacional = Relacional;
const DominanteRelacional = [
    [Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO],
    [Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO],
    [Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO],
    [Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.NULO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO],
    [Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO, Tipos_1.TipoDato.BOOLEANO],
];
var OperadorRelacional;
(function (OperadorRelacional) {
    OperadorRelacional[OperadorRelacional["IGUALDAD"] = 0] = "IGUALDAD";
    OperadorRelacional[OperadorRelacional["DISTINTO"] = 1] = "DISTINTO";
    OperadorRelacional[OperadorRelacional["MENOR"] = 2] = "MENOR";
    OperadorRelacional[OperadorRelacional["MENORIGUAL"] = 3] = "MENORIGUAL";
    OperadorRelacional[OperadorRelacional["MAYOR"] = 4] = "MAYOR";
    OperadorRelacional[OperadorRelacional["MAYORIGUAL"] = 5] = "MAYORIGUAL";
})(OperadorRelacional || (exports.OperadorRelacional = OperadorRelacional = {}));
