"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Round = void 0;
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Round extends Expresion_1.Expresion {
    constructor(exp, linea, columna) {
        super(linea, columna);
        this.exp = exp;
    }
    calcular(entorno) {
        const r = this.exp.calcular(entorno);
        if (r.tipoDato == Tipos_1.TipoDato.DECIMAL || r.tipoDato == Tipos_1.TipoDato.ENTERO) {
            return { valor: Math.round(parseFloat(r.valor)), tipoDato: Tipos_1.TipoDato.ENTERO };
        }
        else {
            //throw new Error(`Semantico: No se puede aplicar la función Round a un valor de tipo ${r.tipoDato}`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`No se puede aplicar la función Round a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let roundNode = `n${counter.get()}`;
        let roundLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${roundNode}[label="Round"];\n`;
        result += `${roundLabelNode}[label="round"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${roundNode};\n`;
        result += `${roundNode} -> ${roundLabelNode};\n`;
        result += `${roundNode} -> ${lParenNode};\n`;
        result += `${roundNode} -> ${expNode};\n`;
        result += this.exp.getAST(expNode);
        result += `${roundNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Round = Round;
