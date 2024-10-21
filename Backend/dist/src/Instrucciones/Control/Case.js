"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("../Instruccion");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Case extends Instruccion_1.Instruccion {
    constructor(cond, ins, line, column) {
        super(line, column);
        this.cond = cond;
        this.ins = ins;
    }
    ejecutar(entorno) {
        for (const instruccion of this.ins) {
            try {
                const cs = instruccion.ejecutar(entorno);
                if (cs != null || cs != undefined) {
                    return cs;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let caseNodeT = `n${counter.get()}`;
        let caseNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let instructionsNode = `n${counter.get()}`;
        result += `${caseNodeT}[label="I_case"];\n`;
        result += `${caseNode}[label="case"];\n`;
        result += `${expNode}[label="exp"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${instructionsNode}[label="instructions"];\n`;
        result += `${anterior} -> ${caseNodeT};\n`;
        result += `${caseNodeT} -> ${caseNode};\n`;
        result += `${caseNodeT} -> ${expNode};\n`;
        result += this.cond.getAST(expNode);
        result += `${caseNodeT} -> ${colonNode};\n`;
        result += `${caseNodeT} -> ${instructionsNode};\n`;
        for (const instruction of this.ins) {
            result += instruction.getAST(instructionsNode);
        }
        return result;
    }
}
exports.Case = Case;
