"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Is = void 0;
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Is extends Expresion_1.Expresion {
    constructor(exp, tipo, linea, columna) {
        super(linea, columna);
        this.exp = exp;
        this.tipo = tipo;
    }
    calcular(entorno) {
        const valorExp = this.exp.calcular(entorno);
        let tipoEvaluado;
        switch (this.tipo.toLowerCase()) {
            case "int":
                tipoEvaluado = Tipos_1.TipoDato.ENTERO;
                break;
            case "double":
                tipoEvaluado = Tipos_1.TipoDato.DECIMAL;
                break;
            case "bool":
                tipoEvaluado = Tipos_1.TipoDato.BOOLEANO;
                break;
            case "char":
                tipoEvaluado = Tipos_1.TipoDato.CHAR;
                break;
            case "string":
                tipoEvaluado = Tipos_1.TipoDato.STRING;
                break;
            default:
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${this.tipo} no reconocido`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        const resultado = {
            valor: valorExp.tipoDato === tipoEvaluado,
            tipoDato: Tipos_1.TipoDato.BOOLEANO
        };
        return resultado;
    }
    /* EXPRESION IS TIPO */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let isNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let isLabelNode = `n${counter.get()}`;
        let tipoNode = `n${counter.get()}`;
        result += `${isNode}[label="Is"];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${isLabelNode}[label="is"];\n`;
        result += `${tipoNode}[label="${this.tipo}"];\n`;
        result += `${anterior} -> ${isNode};\n`;
        result += `${isNode} -> ${expNode};\n`;
        result += this.exp.getAST(expNode);
        result += `${isNode} -> ${isLabelNode};\n`;
        result += `${isNode} -> ${tipoNode};\n`;
        return result;
    }
}
exports.Is = Is;
