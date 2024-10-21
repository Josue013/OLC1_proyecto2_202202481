"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Entorno_1 = require("../../Entorno/Entorno");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class For extends Instruccion_1.Instruccion {
    constructor(Declaracion, cond, incremento, instrucciones, linea, columna) {
        super(linea, columna);
        this.Declaracion = Declaracion;
        this.cond = cond;
        this.incremento = incremento;
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        const nuevoEntorno = new Entorno_1.Entorno(entorno);
        this.Declaracion.ejecutar(nuevoEntorno);
        let cond = this.cond.calcular(nuevoEntorno);
        // Verificar que la condición sea de tipo booleano
        if (cond.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición del bucle for debe ser de tipo booleano", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        while (cond.valor === true) {
            const transfer = this.instrucciones.ejecutar(nuevoEntorno); // Declarar transfer como any
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break;
                }
                else if (transfer instanceof Continue_1.Continue) {
                    this.incremento.ejecutar(nuevoEntorno);
                    cond = this.cond.calcular(nuevoEntorno);
                    continue;
                }
                else if (transfer.typeValue == 'return') {
                    return transfer;
                }
                else {
                    //throw new Error("Error en For");
                    throw (0, AST_1.agregarError)(new Errores_1.Error_("Error en For", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
            this.incremento.ejecutar(nuevoEntorno);
            cond = this.cond.calcular(nuevoEntorno);
            // Verificar que la condición siga siendo de tipo booleano después del incremento
            if (cond.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
                //throw new Error("La condición del bucle for debe ser de tipo booleano");
                throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición del bucle for debe ser de tipo booleano", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
    }
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let forNodeT = `n${counter.get()}`;
        let forNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let instructionNode = `n${counter.get()}`;
        let semicolonNode1 = `n${counter.get()}`;
        let expressionNode = `n${counter.get()}`;
        let semicolonNode2 = `n${counter.get()}`;
        let instructionNode2 = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        result += `${forNodeT}[label="I_For"];\n`;
        result += `${forNode}[label="for"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${instructionNode}[label="Instruction"];\n`;
        result += `${semicolonNode1}[label=";"];\n`;
        result += `${expressionNode}[label="Expression"];\n`;
        result += `${semicolonNode2}[label=";"];\n`;
        result += `${instructionNode2}[label="Instruction"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${last} -> ${forNodeT};\n`;
        result += `${forNodeT} -> ${forNode};\n`;
        result += `${forNodeT} -> ${lParenNode};\n`;
        result += `${forNodeT} -> ${instructionNode};\n`;
        result += this.Declaracion.getAST(instructionNode);
        result += `${forNodeT} -> ${semicolonNode1};\n`;
        result += `${forNodeT} -> ${expressionNode};\n`;
        result += this.cond.getAST(expressionNode);
        result += `${forNodeT} -> ${semicolonNode2};\n`;
        result += `${forNodeT} -> ${instructionNode2};\n`;
        result += this.incremento.getAST(instructionNode2);
        result += `${forNodeT} -> ${rParenNode};\n`;
        result += `${forNodeT} -> ${blockNode};\n`;
        result += this.instrucciones.getAST(blockNode);
        return result;
    }
}
exports.For = For;
