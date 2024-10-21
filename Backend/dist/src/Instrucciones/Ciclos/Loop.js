"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loop = void 0;
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Loop extends Instruccion_1.Instruccion {
    constructor(instrucciones, linea, columna) {
        super(linea, columna);
        this.instrucciones = instrucciones;
    }
    ejecutar(entorno) {
        while (true) { // Bucle infinito
            const transfer = this.instrucciones.ejecutar(entorno); // Ejecutar las instrucciones
            if (transfer != null || transfer != undefined) {
                if (transfer instanceof Break_1.Break) {
                    break; // Salir del bucle si se encuentra un break
                }
                else if (transfer.typeValue == 'return') {
                    return transfer;
                }
                else if (transfer instanceof Continue_1.Continue) {
                    continue; // Continuar con la siguiente iteración si se encuentra un continue
                }
                else {
                    //throw new Error("Error en Loop");
                    throw (0, AST_1.agregarError)(new Errores_1.Error_("Error en Loop", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
        }
    }
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let loopNodeT = `n${counter.get()}`;
        let loopNode = `n${counter.get()}`;
        let blockNode = `n${counter.get()}`;
        result += `${loopNodeT}[label="I_Loop"];\n`;
        result += `${loopNode}[label="loop"];\n`;
        result += `${blockNode}[label="Block"];\n`;
        result += `${last} -> ${loopNodeT};\n`;
        result += `${loopNodeT} -> ${loopNode};\n`;
        result += `${loopNodeT} -> ${blockNode};\n`;
        result += this.instrucciones.getAST(blockNode);
        return result;
    }
}
exports.Loop = Loop;
