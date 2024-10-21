"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWhile = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class CWhile extends Instruccion_1.Instruccion {
    constructor(condicion, instrucciones, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        let cond = this.condicion.calcular(entorno);
        // Verificar que la condición sea de tipo booleano
        if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
            //throw new Error("La condición no es booleana");
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        while (cond.valor === true) {
            const transfer = this.instrucciones.ejecutar(entorno); // Declarar transfer como any
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break;
                }
                else if (transfer instanceof Continue_1.Continue) {
                    cond = this.condicion.calcular(entorno); // Recalcular la condición después de continue
                    continue;
                }
                else if (transfer.typeValue == 'return') {
                    return transfer;
                }
                else {
                    //throw new Error("Error en While");
                    throw (0, AST_1.agregarError)(new Errores_1.Error_("Error en While", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
            cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración
            // Verificar que la condición siga siendo de tipo booleano después de cada iteración
            if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
                //throw new Error("La condición no es booleana");
                throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
    }
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let whileNodeT = `n${counter.get()}`;
        let whileNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expressionNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        result += `${whileNodeT}[label="I_While"];\n`;
        result += `${whileNode}[label="While"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expressionNode}[label="Expression"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${last} -> ${whileNodeT};\n`;
        result += `${whileNodeT} -> ${whileNode};\n`;
        result += `${whileNode} -> ${lParenNode};\n`;
        result += `${whileNode} -> ${expressionNode};\n`;
        result += this.condicion.getAST(expressionNode);
        result += `${whileNode} -> ${rParenNode};\n`;
        result += `${whileNode} -> ${blockNode};\n`;
        result += this.instrucciones.getAST(blockNode);
        return result;
    }
}
exports.CWhile = CWhile;
