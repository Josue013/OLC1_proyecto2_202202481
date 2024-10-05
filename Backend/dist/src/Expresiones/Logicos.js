"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorLogico = exports.Logico = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
class Logico extends Expresion_1.Expresion {
    constructor(exp1, exp2, operador, linea, columna) {
        super(linea, columna);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operador = operador;
    }
    calcular(entorno) {
        const exp1 = this.exp1.calcular(entorno);
        const exp2 = this.exp2.calcular(entorno);
        if (exp1.tipoDato != Tipos_1.TipoDato.BOOLEANO)
            throw new Error("El tipo de dato no es booleano");
        if (exp2.tipoDato != Tipos_1.TipoDato.BOOLEANO)
            throw new Error("El tipo de dato no es booleano");
        // AND
        if (this.operador == OperadorLogico.AND)
            return { valor: exp1.valor && exp2.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        // OR
        if (this.operador == OperadorLogico.OR)
            return { valor: exp1.valor || exp2.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        // NOT
        if (this.operador == OperadorLogico.NOT)
            return { valor: !exp1.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        throw new Error("Verificar operador relacional");
    }
}
exports.Logico = Logico;
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["AND"] = 0] = "AND";
    OperadorLogico[OperadorLogico["OR"] = 1] = "OR";
    OperadorLogico[OperadorLogico["NOT"] = 2] = "NOT";
})(OperadorLogico || (exports.OperadorLogico = OperadorLogico = {}));
