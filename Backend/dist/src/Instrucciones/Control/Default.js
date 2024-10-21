"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Default extends Instruccion_1.Instruccion {
    constructor(ins, line, column) {
        super(line, column);
        this.ins = ins;
    }
    ejecutar(entorno) {
        for (const instruccion of this.ins) {
            try {
                const cs = instruccion.ejecutar(entorno);
                if (cs != null || cs != undefined) {
                    if (cs instanceof Break_1.Break) {
                        break;
                    }
                    else if (cs.typeValue == 'return') {
                        return cs;
                    }
                    else {
                        //throw new Error("Error en Case");
                        throw (0, AST_1.agregarError)(new Errores_1.Error_("Error en Case", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    getAST(anterior) {
        let ast = "";
        let counter = Contador_1.default.getInstancia();
        let defaultNodeT = `n${counter.get()}`;
        let defaultNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let instructionsNode = `n${counter.get()}`;
        ast += `${defaultNodeT}[label="I_default"];\n`;
        ast += `${defaultNode}[label="default"];\n`;
        ast += `${colonNode}[label=":"];\n`;
        ast += `${instructionsNode}[label="instructions"];\n`;
        ast += `${anterior} -> ${defaultNodeT};\n`;
        ast += `${defaultNodeT} -> ${defaultNode};\n`;
        ast += `${defaultNodeT} -> ${colonNode};\n`;
        ast += `${defaultNodeT} -> ${instructionsNode};\n`;
        for (const instruction of this.ins) {
            ast += instruction.getAST(instructionsNode);
        }
        return ast;
    }
}
exports.Default = Default;
