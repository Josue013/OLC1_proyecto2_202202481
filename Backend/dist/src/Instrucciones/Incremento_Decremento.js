"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento_Decremento = void 0;
const Instruccion_1 = require("./Instruccion");
const Tipos_1 = require("../Expresiones/Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Incremento_Decremento extends Instruccion_1.Instruccion {
    constructor(id, signo, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.signo = signo;
    }
    ejecutar(entorno) {
        const simbolo = entorno.obtenerVariable(this.id);
        if (simbolo) {
            if (simbolo.esConstante) {
                //throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable ${this.id} es una constante y no puede ser reasignada`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            let nuevoValor = { valor: 0, tipoDato: simbolo.obtenertipoDato() };
            if (simbolo.obtenertipoDato() == Tipos_1.TipoDato.ENTERO || simbolo.obtenertipoDato() == Tipos_1.TipoDato.DECIMAL) {
                if (this.signo == "++") {
                    nuevoValor.valor = simbolo.getValor().valor + 1;
                }
                else if (this.signo == "--") {
                    nuevoValor.valor = simbolo.getValor().valor - 1;
                }
                else {
                    //throw new Error(`Operador ${this.signo} no permitido`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Operador ${this.signo} no permitido`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
            else {
                //throw new Error(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${TipoDato.ENTERO} o ${TipoDato.DECIMAL}`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${Tipos_1.TipoDato.ENTERO} o ${Tipos_1.TipoDato.DECIMAL}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            simbolo.setValor(nuevoValor);
            simbolo.actualizarValor(nuevoValor);
            //entorno.actualizarSimbolo(this.id, simbolo);
            //console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        }
        else {
            //throw new Error(`La variable ${this.id} no existe`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable ${this.id} no existe`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
    }
    getAST(last) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let incDecNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let incDecNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${incDecNodeT}[label="Incremento_Decremento"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${incDecNode}[label="${this.signo}"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${last} -> ${incDecNodeT};\n`;
        result += `${incDecNodeT} -> ${idNode};\n`;
        result += `${incDecNodeT} -> ${incDecNode};\n`;
        result += `${incDecNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Incremento_Decremento = Incremento_Decremento;
