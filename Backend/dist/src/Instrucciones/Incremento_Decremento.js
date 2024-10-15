"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incremento_Decremento = void 0;
const Instruccion_1 = require("./Instruccion");
const Tipos_1 = require("../Expresiones/Tipos");
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
                throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
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
                    throw new Error(`Operador ${this.signo} no permitido`);
                }
            }
            else {
                throw new Error(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${Tipos_1.TipoDato.ENTERO} o ${Tipos_1.TipoDato.DECIMAL}`);
            }
            simbolo.setValor(nuevoValor);
            simbolo.actualizarValor(nuevoValor);
            //entorno.actualizarSimbolo(this.id, simbolo);
            console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        }
        else {
            throw new Error(`La variable ${this.id} no existe`);
        }
    }
}
exports.Incremento_Decremento = Incremento_Decremento;
