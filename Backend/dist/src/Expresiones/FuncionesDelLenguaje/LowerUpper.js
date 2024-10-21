"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowerUpper = void 0;
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class LowerUpper extends Expresion_1.Expresion {
    constructor(exp, bandera, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.bandera = bandera;
    }
    calcular(entorno) {
        const r = this.exp.calcular(entorno);
        if (r.tipoDato != Tipos_1.TipoDato.STRING) {
            //throw new Error(`Semantico: No se puede aplicar la función Lower/Upper a un valor de tipo ${r.tipoDato}`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`No se puede aplicar la función Lower/Upper a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        if (this.bandera) {
            return { valor: r.valor.toLowerCase(), tipoDato: Tipos_1.TipoDato.STRING };
        }
        else {
            return { valor: r.valor.toUpperCase(), tipoDato: Tipos_1.TipoDato.STRING };
        }
    }
    /* LOWER/UPPER ( EXPRESION ) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let lowerUpperNode = `n${counter.get()}`;
        let lowerUpperLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${lowerUpperNode}[label="${this.bandera ? "LOWER" : "UPPER"}"];\n`;
        result += `${lowerUpperLabelNode}[label="${this.bandera ? "lower" : "upper"}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${lowerUpperNode};\n`;
        result += `${lowerUpperNode} -> ${lowerUpperLabelNode};\n`;
        result += `${lowerUpperNode} -> ${lParenNode};\n`;
        result += `${lowerUpperNode} -> ${expNode};\n`;
        result += this.exp.getAST(expNode);
        result += `${lowerUpperNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.LowerUpper = LowerUpper;
