"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Contador_1 = __importDefault(require("../Entorno/Contador"));
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
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
        result += `${breakNodeT}[label="InstruccionBreak"];\n`;
        result += `${breakNode}[label="break"];\n`;
        result += `${breakNodeT} -> ${breakNode};\n`;
        result += `${breakNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Break = Break;
