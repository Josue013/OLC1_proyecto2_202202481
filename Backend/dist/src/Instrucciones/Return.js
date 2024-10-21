"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("./Instruccion");
const Tipos_1 = require("../Expresiones/Tipos");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Return extends Instruccion_1.Instruccion {
    constructor(line, column, valor) {
        super(line, column);
        this.valor = valor;
    }
    ejecutar(entorno) {
        if (this.valor != null) {
            const value = this.valor.calcular(entorno);
            return { line: this.linea, column: this.columna, typeValue: "return", value: value.valor, type: value.tipoDato };
        }
        else {
            return { line: this.linea, column: this.columna, typeValue: "return", value: null, type: Tipos_1.TipoDato.NULO };
        }
    }
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let returnNodeT = `n${counter.get()}`;
        let returnNode = `n${counter.get()}`;
        result += `${returnNodeT}[label="IntruccionReturn"];\n`;
        result += `${returnNode}[label="return"];\n`;
        result += `${last} -> ${returnNodeT};\n`;
        result += `${returnNodeT} -> ${returnNode};\n`;
        if (this.valor != null) {
            let expNode = `n${counter.get()}`;
            result += `${expNode}[label="Expresion"];\n`;
            result += `${returnNodeT} -> ${expNode};\n`;
            result += this.valor.getAST(expNode);
        }
        return result;
    }
}
exports.Return = Return;
