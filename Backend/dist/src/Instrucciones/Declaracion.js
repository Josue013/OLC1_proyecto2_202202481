"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const Errores_1 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipoDato, ids, exp, esConstante, linea, columna) {
        super(linea, columna);
        this.tipoDato = tipoDato;
        // Asegurarse de que ids sea un array
        this.ids = ids;
        this.exp = exp;
        this.esConstante = esConstante;
    }
    ejecutar(entorno) {
        let tipo;
        let valorPredeterminado;
        // Definir el tipo dominante según el tipo de dato
        switch (this.tipoDato) {
            case "int":
                tipo = Tipos_1.TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipo = Tipos_1.TipoDato.DECIMAL;
                valorPredeterminado = 0.00;
                break;
            case "bool":
                tipo = Tipos_1.TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipo = Tipos_1.TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipo = Tipos_1.TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`${this.tipoDato}, no se permite en la declaración de variables`, this.linea, this.columna, Errores_1.TipoError.SEMANTICO));
        }
        // Si existe una expresión, calcular su valor
        if (this.exp != null) {
            const valor = this.exp.calcular(entorno);
            // Validar que el tipo de la expresión coincida con el tipo dominante
            if (tipo != valor.tipoDato) {
                //throw new Error(`Tipo ${valor.tipoDato} no asignable a ${tipo}`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${valor.tipoDato} no asignable a ${tipo}`, this.linea, this.columna, Errores_1.TipoError.SEMANTICO));
            }
            // Guardar cada variable con el valor de la expresión
            this.ids.forEach(id => {
                entorno.guardarVariable(id, valor, tipo, this.esConstante, this.linea, this.columna);
            });
        }
        else {
            // Guardar cada variable con el valor predeterminado
            this.ids.forEach(id => {
                entorno.guardarVariable(id, { valor: valorPredeterminado, tipoDato: tipo }, tipo, this.esConstante, this.linea, this.columna);
            });
        }
    }
    /* LET ID : TIPO ( | = EXPRESSION) */
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let declarationNode = `n${counter.get()}`;
        let letNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        result += `${declarationNode}[label="Declaración"];\n`;
        result += `${letNode}[label="LET"];\n`;
        result += `${typeNode}[label="${this.tipoDato}"];\n`;
        result += `${last} -> ${declarationNode};\n`;
        result += `${declarationNode} -> ${letNode};\n`;
        for (let i = 0; i < this.ids.length; i++) {
            let idNode = `n${counter.get()}`;
            result += `${idNode}[label="${this.ids[i]}"];\n`;
            result += `${declarationNode} -> ${idNode};\n`;
            if (i < this.ids.length - 1) {
                let commaNode = `n${counter.get()}`;
                result += `${commaNode}[label=","];\n`;
                result += `${declarationNode} -> ${commaNode};\n`;
            }
        }
        let colonNode = `n${counter.get()}`;
        result += `${colonNode}[label=":"];\n`;
        result += `${declarationNode} -> ${colonNode};\n`;
        result += `${declarationNode} -> ${typeNode};\n`;
        if (this.exp != null) {
            let equalNode = `n${counter.get()}`;
            let expNode = `n${counter.get()}`;
            result += `${equalNode}[label="="];\n`;
            result += `${expNode}[label="Expresion"];\n`;
            result += `${declarationNode} -> ${equalNode};\n`;
            result += `${declarationNode} -> ${expNode};\n`;
            result += this.exp.getAST(expNode);
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${declarationNode} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Declaracion = Declaracion;
