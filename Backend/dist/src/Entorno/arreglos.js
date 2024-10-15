"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arreglo = void 0;
const Simbolo_1 = require("./Simbolo");
class Arreglo {
    constructor(id, tipo, exp1, exp2, linea, columna) {
        this.id = id;
        this.tipo = tipo;
        this.linea = linea;
        this.columna = columna;
        // valores de la matriz
        // [exp1][exp2]
        this.valor = new Array(exp1); // [exp1]
        for (let i = 0; i < exp1; i++) {
            this.valor[i] = new Array(exp2); // [exp2]
        }
    }
    // obtener valor de la matriz
    obtenerValor(fila, columna) {
        if (fila < 0 || fila >= this.valor.length || columna < 0 || columna >= this.valor[0].length) {
            throw new Error("Índice fuera de los límites");
        }
        return this.valor[fila][columna];
    }
    // asignar valor a la matriz
    asignarValor(fila, columna, id, tipo, valor, line, column) {
        if (fila < 0 || fila >= this.valor.length || columna < 0 || columna >= this.valor[0].length) {
            throw new Error("Índice fuera de los límites");
        }
        this.valor[fila][columna] = new Simbolo_1.Simbolo(id, valor, tipo, false, line, column);
    }
    // inicializar valores predeterminados
    inicializarValoresPredeterminados(id, tipo, valor, linea, columna) {
        for (let i = 0; i < this.valor.length; i++) {
            for (let j = 0; j < this.valor[i].length; j++) {
                this.valor[i][j] = new Simbolo_1.Simbolo(id, valor, tipo, false, linea, columna);
            }
        }
    }
    // establecer el arreglo
    establecerArreglo(arreglo) {
        this.valor = arreglo;
    }
}
exports.Arreglo = Arreglo;
