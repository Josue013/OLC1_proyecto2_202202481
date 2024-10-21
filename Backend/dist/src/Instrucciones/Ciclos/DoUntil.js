"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoUntil = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class DoUntil extends Instruccion_1.Instruccion {
    constructor(instrucciones, condicion, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
        this.condicion = condicion;
    }
    ejecutar(entorno) {
        let cond = this.condicion.calcular(entorno);
        if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        do {
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
                    throw (0, AST_1.agregarError)(new Errores_1.Error_("Error en DoUntil", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
            cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración
            // Verificar que la condición siga siendo de tipo booleano después de cada iteración
            if (cond.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
                //throw new Error("La condición no es booleana");
                throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        } while (cond.valor === false);
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let doNodeT = `n${counter.get()}`;
        let doNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        let untilNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expressionNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${doNodeT}[label="I_DoUntil"];\n`;
        result += `${doNode}[label="do"];\n`;
        result += `${blockNode}[label="block"];\n`;
        result += `${untilNode}[label="until"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expressionNode}[label="expression"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${anterior} -> ${doNodeT};\n`;
        result += `${doNodeT} -> ${doNode};\n`;
        result += `${doNodeT} -> ${blockNode};\n`;
        result += this.instrucciones.getAST(blockNode);
        result += `${doNodeT} -> ${untilNode};\n`;
        result += `${doNodeT} -> ${lParenNode};\n`;
        result += `${doNodeT} -> ${expressionNode};\n`;
        result += this.condicion.getAST(expressionNode);
        result += `${doNodeT} -> ${rParenNode};\n`;
        result += `${doNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.DoUntil = DoUntil;
