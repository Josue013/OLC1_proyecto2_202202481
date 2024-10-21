"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToCharArray = void 0;
const Basico_1 = require("../Basico");
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
// ToCharArray
class ToCharArray extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    calcular(entorno) {
        const r = this.expresion.calcular(entorno);
        if (r.tipoDato != Tipos_1.TipoDato.STRING) {
            //throw new Error(`Semantico: No se puede aplicar la función ToCharArray a un valor de tipo ${r.tipoDato}`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`No se puede aplicar la función ToCharArray a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        const vector = [];
        const palabra = r.valor;
        for (let i = 0; i < palabra.length; i++) {
            vector.push(new Basico_1.Basico(r.valor[i], Tipos_1.TipoDato.CHAR, this.linea, this.columna));
        }
        return { valor: vector, tipoDato: Tipos_1.TipoDato.CHAR };
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let toCharArrayNode = `n${counter.get()}`;
        let toCharArrayLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${toCharArrayNode}[label="ToCharArray"];\n`;
        result += `${toCharArrayLabelNode}[label="toCharArray"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${toCharArrayNode};\n`;
        result += `${toCharArrayNode} -> ${toCharArrayLabelNode};\n`;
        result += `${toCharArrayNode} -> ${lParenNode};\n`;
        result += `${toCharArrayNode} -> ${expNode};\n`;
        result += this.expresion.getAST(expNode);
        result += `${toCharArrayNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.ToCharArray = ToCharArray;
