"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesoVector = void 0;
const Tipos_1 = require("./Tipos");
const Expresion_1 = require("./Expresion");
class AccesoVector extends Expresion_1.Expresion {
    constructor(id, exp1, exp2, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    calcular(entorno) {
        entorno.imprimirArreglos();
        const vector = entorno.obtenerArreglo(this.id);
        const exp1 = this.exp1.calcular(entorno);
        if (exp1.tipoDato != Tipos_1.TipoDato.ENTERO) {
            throw new Error("La posición exp1 debe ser de tipo entero");
        }
        let exp2;
        if (this.exp2 != null) {
            exp2 = this.exp2.calcular(entorno).valor;
        }
        else {
            exp2 = 0;
        }
        if (vector == null) {
            throw new Error(`El vector ${this.id} no existe`);
        }
        let valor = vector.obtenerValor(exp1.valor, exp2).valor;
        // Desanidar el valor si es necesario
        while (valor && typeof valor === 'object' && 'valor' in valor) {
            valor = valor.valor;
        }
        return { valor: valor, tipoDato: vector.tipo };
    }
}
exports.AccesoVector = AccesoVector;
