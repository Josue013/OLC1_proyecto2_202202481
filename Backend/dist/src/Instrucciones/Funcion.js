"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const AST_1 = require("../AST/AST");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Funcion extends Instruccion_1.Instruccion {
    constructor(tipo, id, parametros, instrucciones, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.instrucciones = instrucciones;
        this.tipoDato = Tipos_1.TipoDato.NULO;
    }
    ejecutar(entorno) {
        let tipoDominante;
        // Definir el tipo dominante según el tipo de dato
        switch (this.tipo) {
            case "int":
                tipoDominante = Tipos_1.TipoDato.ENTERO; // Tipo de dato entero
                break;
            case "double":
                tipoDominante = Tipos_1.TipoDato.DECIMAL; // Tipo de dato decimal
                break;
            case "bool":
                tipoDominante = Tipos_1.TipoDato.BOOLEANO; // Tipo de dato booleano
                break;
            case "char":
                tipoDominante = Tipos_1.TipoDato.CHAR; // Tipo de dato char
                break;
            case "string":
                tipoDominante = Tipos_1.TipoDato.STRING; // Tipo de dato string
                break;
            case "void":
                tipoDominante = Tipos_1.TipoDato.NULO; // Tipo de dato nulo cuando sea void
                break;
            default:
                //throw new Error(`Tipo ${this.tipo} no permitido para la declaración de funciones`);
                throw (0, AST_1.agregarError)(new Errores_2.Error_(`Tipo ${this.tipo} no permitido para la declaración de funciones`, this.linea, this.columna, Errores_1.TipoError.SEMANTICO));
        }
        // Guardar la función en el entorno
        this.tipoDato = tipoDominante;
        entorno.guardarFuncion(this.id, this);
        // Guardar los valores predeterminados de los parámetros en el entorno
        for (let parametro of this.parametros) {
            if (parametro.exp != null) {
                const valor = parametro.exp.calcular(entorno);
                entorno.guardarVariable(parametro.id, valor, valor.tipoDato, false, this.linea, this.columna);
            }
        }
    }
    /* Function TIPO ID ( PARAMETROS ) BLOQUE */
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let functionNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        result += `${functionNode}[label="Declaración Function"];\n`;
        result += `${typeNode}[label="${this.tipo}"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${last} -> ${functionNode};\n`;
        result += `${functionNode} -> ${typeNode};\n`;
        result += `${functionNode} -> ${idNode};\n`;
        result += `${functionNode} -> ${lParenNode};\n`;
        if (this.parametros.length != 0) {
            for (let i = 0; i < this.parametros.length; i++) {
                let paramNode = `n${counter.get()}`;
                result += `${paramNode}[label="param"];\n`;
                result += `${functionNode} -> ${paramNode};\n`;
                let paramTypeNode = `n${counter.get()}`;
                let paramIdNode = `n${counter.get()}`;
                result += `${paramTypeNode}[label="${this.parametros[i].tipo}"];\n`;
                if (this.parametros[i].vector) {
                    if (this.parametros[i].simple) {
                        result += `${paramIdNode}[label="${this.parametros[i].id}[]"];\n`;
                    }
                    else {
                        result += `${paramIdNode}[label="${this.parametros[i].id}[][]"];\n`;
                    }
                }
                else {
                    result += `${paramIdNode}[label="${this.parametros[i].id}"];\n`;
                }
                result += `${paramNode} -> ${paramTypeNode};\n`;
                result += `${paramNode} -> ${paramIdNode};\n`;
                if (i < this.parametros.length - 1) {
                    let commaNode = `n${counter.get()}`;
                    result += `${commaNode}[label=","];\n`;
                    result += `${functionNode} -> ${commaNode};\n`;
                }
            }
        }
        result += `${functionNode} -> ${rParenNode};\n`;
        result += `${functionNode} -> ${blockNode};\n`;
        result += this.instrucciones.getAST(blockNode);
        return result;
    }
}
exports.Funcion = Funcion;
