"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bloque = void 0;
const Entorno_1 = require("../Entorno/Entorno");
const Instruccion_1 = require("./Instruccion");
const Continue_1 = require("./Continue");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Bloque extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        const newEnv = new Entorno_1.Entorno(entorno);
        for (const instruccion of this.instrucciones) {
            try {
                const transfer = instruccion.ejecutar(newEnv);
                if (transfer != null || transfer != undefined) {
                    if (transfer instanceof Continue_1.Continue) {
                        continue;
                    }
                    return transfer;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return null;
    }
    getAST(anterior) {
        let ast = "";
        let counter = Contador_1.default.getInstancia();
        let lbracket = `n${counter.get()}`;
        let rbracket = `n${counter.get()}`;
        ast += `${lbracket}[label="{"];\n`;
        ast += `${anterior} -> ${lbracket};\n`;
        for (const instruction of this.instrucciones) {
            ast += instruction.getAST(lbracket);
        }
        ast += `${rbracket}[label="}"];\n`;
        ast += `${anterior} -> ${rbracket};\n`;
        return ast;
    }
}
exports.Bloque = Bloque;
