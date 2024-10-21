"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Len = void 0;
const Expresion_1 = require("../Expresion");
const Tipos_1 = require("../Tipos");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Len extends Expresion_1.Expresion {
    constructor(expresion, linea, columna) {
        super(linea, columna);
        this.expresion = expresion;
    }
    calcular(entorno) {
        const r = this.expresion.calcular(entorno);
        if (r.tipoDato == Tipos_1.TipoDato.ID) {
            const vector = entorno.obtenerArreglo(r.valor);
            if (vector) {
                return { valor: vector.valor.length, tipoDato: Tipos_1.TipoDato.ENTERO };
            }
            else {
                //throw new Error(`No se puede aplicar la función length a un valor de tipo ${r.tipoDato}`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`No se puede aplicar la función length a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
        else if (r.tipoDato == Tipos_1.TipoDato.STRING) {
            return { valor: r.valor.length, tipoDato: Tipos_1.TipoDato.ENTERO };
        }
        else {
            //throw new Error(`Expresión no válida para comando length`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Expresión no válida para comando length`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let lenNode = `n${counter.get()}`;
        let lenLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${lenNode}[label="Len"];\n`;
        result += `${lenLabelNode}[label="len"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${lenNode};\n`;
        result += `${lenNode} -> ${lenLabelNode};\n`;
        result += `${lenNode} -> ${lParenNode};\n`;
        result += `${lenNode} -> ${expNode};\n`;
        result += this.expresion.getAST(expNode);
        result += `${lenNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Len = Len;
