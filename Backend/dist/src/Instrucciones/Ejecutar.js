"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ejecutar = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Ejecutar extends Instruccion_1.Instruccion {
    constructor(funcion, line, column) {
        super(line, column);
        this.funcion = funcion;
    }
    ejecutar(entorno) {
        // Verificar si la función existe en el entorno
        if (entorno.obtenerFuncion(this.funcion.id) == null) {
            throw new Error(`La función ${this.funcion.id} no existe`);
        }
        else {
            const r = this.funcion.ejecutar(entorno);
            if (r != null) {
                return { valor: r.valor, tipoDato: r.tipoDato };
            }
            else {
                return { valor: null, tipoDato: Tipos_1.TipoDato.NULO };
            }
        }
    }
    /* EJECUTAR ID (  | PARAMETORS) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let ejecutarNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${ejecutarNode}[label="EJECUTAR"];\n`;
        result += `${idNode}[label="${this.funcion.id}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${ejecutarNode};\n`;
        result += `${ejecutarNode} -> ${idNode};\n`;
        result += `${ejecutarNode} -> ${lParenNode};\n`;
        if (this.funcion.parametros.length != 0) {
            for (let i = 0; i < this.funcion.parametros.length; i++) {
                let paramNode = `n${counter.get()}`;
                result += `${paramNode}[label="param"];\n`;
                result += `${ejecutarNode} -> ${paramNode};\n`;
                result += this.funcion.parametros[i].exp.getAST(paramNode);
                if (i < this.funcion.parametros.length - 1) {
                    let commaNode = `n${counter.get()}`;
                    result += `${commaNode}[label=","];\n`;
                    result += `${ejecutarNode} -> ${commaNode};\n`;
                }
            }
        }
        result += `${ejecutarNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Ejecutar = Ejecutar;
