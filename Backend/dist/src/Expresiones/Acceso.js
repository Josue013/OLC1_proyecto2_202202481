"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Acceso extends Expresion_1.Expresion {
    constructor(id, linea, columna) {
        super(linea, columna);
        this.id = id;
    }
    calcular(entorno) {
        // VARIABLES
        const value = entorno.obtenerVariable(this.id);
        if (value != null) {
            return { valor: value.getValor().valor, tipoDato: value.tipoDato };
        }
        // VECTORES
        const vector = entorno.obtenerArreglo(this.id);
        if (vector != null) {
            return { valor: vector.id, tipoDato: Tipos_1.TipoDato.ID };
        }
        //throw new Error(`La variable o vector ${this.id} no existe`);
        throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable o vector ${this.id} no existe`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let idNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        result += `${idNodeT}[label="Acceso"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${anterior} -> ${idNodeT};\n`;
        result += `${idNodeT} -> ${idNode};\n`;
        return result;
    }
}
exports.Acceso = Acceso;
