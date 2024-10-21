"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
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
            throw (0, AST_1.agregarError)(new Errores_1.Error_("Verifique los tipos de datos para: " + this.operador, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
        throw (0, AST_1.agregarError)(new Errores_1.Error_("Verificar operador relacional", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
    }
    /* EXPRESION OPERADOR EXPRESION */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let relacionalNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let operadorNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
        result += `${relacionalNode}[label="Operador Relacional"];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${operadorNode}[label="${this.getOperador()}"];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;
        result += `${anterior} -> ${relacionalNode};\n`;
        result += `${relacionalNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${relacionalNode} -> ${operadorNode};\n`;
        result += `${relacionalNode} -> ${exp2Node};\n`;
        result += this.exp2.getAST(exp2Node);
        return result;
    }
    getOperador() {
        switch (this.operador) {
            case OperadorRelacional.IGUALDAD:
                return "==";
            case OperadorRelacional.DISTINTO:
                return "!=";
            case OperadorRelacional.MENOR:
                return "<";
            case OperadorRelacional.MENORIGUAL:
                return "<=";
            case OperadorRelacional.MAYOR:
                return ">";
            case OperadorRelacional.MAYORIGUAL:
                return ">=";
            default:
                return "";
        }
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
