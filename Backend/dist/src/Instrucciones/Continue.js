"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Contador_1 = __importDefault(require("../Entorno/Contador"));
const Instruccion_1 = require("./Instruccion");
class Continue extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    ejecutar(entorno) {
        return this;
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let breakNodeT = `n${counter.get()}`;
        let breakNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${breakNodeT}[label="InstruccionContinue"];\n`;
        result += `${breakNode}[label="continue"];\n`;
        result += `${breakNodeT} -> ${breakNode};\n`;
        result += `${breakNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Continue = Continue;
