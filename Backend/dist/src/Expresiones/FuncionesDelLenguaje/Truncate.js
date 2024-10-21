"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Truncate = void 0;
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Truncate extends Expresion_1.Expresion {
    constructor(exp, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.exp = exp;
    }
    calcular(entorno) {
        const r = this.exp.calcular(entorno);
        if (r.tipoDato == Tipos_1.TipoDato.DECIMAL || r.tipoDato == Tipos_1.TipoDato.ENTERO) {
            return { valor: Math.trunc(parseFloat(r.valor)), tipoDato: Tipos_1.TipoDato.ENTERO };
        }
        else {
            //throw new Error(`Semantico: No se puede aplicar la función Truncate a un valor de tipo ${r.tipoDato}`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`No se puede aplicar la función Truncate a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
    }
    /* TRUNCATE ( EXPRESION ) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let truncateNode = `n${counter.get()}`;
        let truncateLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${truncateNode}[label="Truncate"];\n`;
        result += `${truncateLabelNode}[label="TRUNCATE"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${truncateNode};\n`;
        result += `${truncateNode} -> ${truncateLabelNode};\n`;
        result += `${truncateNode} -> ${lParenNode};\n`;
        result += `${truncateNode} -> ${expNode};\n`;
        result += this.exp.getAST(expNode);
        result += `${truncateNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Truncate = Truncate;
