"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fn_if = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
class Fn_if extends Instruccion_1.Instruccion {
    constructor(condicion, instruccionesV, instruccionesF, elseif) {
        super(0, 0);
        this.condicion = condicion;
        this.instruccionesV = instruccionesV;
        this.instruccionesF = instruccionesF;
        this.elseif = elseif;
    }
    ejecutar(entorno) {
        const condicion = this.condicion.calcular(entorno);
        if (condicion.tipoDato != Tipos_1.TipoDato.BOOLEANO)
            throw new Error("La condición no es booleana");
        if (condicion.valor == true) {
            this.instruccionesV.ejecutar(entorno);
        }
        else {
            if (this.instruccionesF != null) { //Else
                this.instruccionesF.ejecutar(entorno);
            }
            else { //Caso Elseif
                this.elseif.ejecutar(entorno);
            }
        }
    }
}
exports.Fn_if = Fn_if;
