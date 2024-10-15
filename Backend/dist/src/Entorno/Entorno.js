"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Simbolo_1 = require("./Simbolo");
const arreglos_1 = require("./arreglos");
class Entorno {
    constructor(entornoPadre) {
        this.entornoPadre = entornoPadre;
        this.variables = new Map();
        this.arreglos = new Map();
    }
    // imprimir arreglos en el map
    imprimirArreglos() {
        console.log("============= IMPRIMIENDO ARREGLOS =============");
        this.arreglos.forEach((arreglo, key) => {
            console.log(key, arreglo.valor);
        });
        console.log("===============================================");
    }
    // guardar variable
    guardarVariable(id, valor, tipoDato, esConstante, linea, columna) {
        const simbolo = new Simbolo_1.Simbolo(id, valor, tipoDato, esConstante, linea, columna);
        if (this.variables.has(id))
            throw Error("Esta variable ya existe");
        this.variables.set(id, simbolo);
    }
    // actualizar variable
    actualiarVariable(id, valor) {
        if (!this.variables.has(id))
            throw new Error("Esta variable no existe");
        const variable = this.variables.get(id);
        variable === null || variable === void 0 ? void 0 : variable.setValor(valor);
    }
    actualizarSimbolo(id, valor) {
        this.variables.set(id, valor);
    }
    // obtener variable
    obtenerVariable(id) {
        let entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id)) {
                return entorno.variables.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return null;
    }
    // obtener arreglo
    obtenerArreglo(id) {
        let entorno = this;
        while (entorno != null) {
            if (entorno.arreglos.has(id)) {
                return entorno.arreglos.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return null;
    }
    // guardar arreglo
    guardarArreglo(id, tipo, filas, columnas, linea, columna) {
        if (this.arreglos.has(id)) {
            throw new Error("Este arreglo ya existe");
        }
        else if (this.variables.has(id)) {
            throw new Error("Este ID es una variable");
        }
        let arreglo = new arreglos_1.Arreglo(id, tipo, filas, columnas, linea, columna);
        this.arreglos.set(id, arreglo);
    }
    // actualizar arreglo
    actualizarArreglo(id, arreglo) {
        if (!this.arreglos.has(id)) {
            throw new Error("Este arreglo no existe");
        }
        this.arreglos.set(id, arreglo);
    }
}
exports.Entorno = Entorno;
