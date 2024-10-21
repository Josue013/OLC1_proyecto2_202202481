"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Echo = void 0;
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
const Instruccion_1 = require("./Instruccion");
class Echo extends Instruccion_1.Instruccion {
    constructor(exp, linea, columna) {
        super(linea, columna);
        this.exp = exp;
    }
    ejecutar(entorno) {
        console.log("");
        console.log("======== Ejecutando echo ==========");
        const exp1 = this.exp.calcular(entorno);
        console.log(exp1);
        (0, AST_1.imprimir)(exp1.valor);
        console.log("===================================");
    }
    /*echo expresion */
    /*echo expresion */
    getAST(anterior) {
        let ast = "";
        let counter = Contador_1.default.getInstancia();
        let echoNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        ast += `${echoNode}[label="echo"];\n`;
        ast += `${anterior} -> ${echoNode};\n`;
        ast += `${expNode}[label="expresion"];\n`;
        ast += `${echoNode} -> ${expNode};\n`;
        ast += this.exp.getAST(expNode);
        return ast;
    }
}
exports.Echo = Echo;
