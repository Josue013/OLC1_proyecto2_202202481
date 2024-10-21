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
        this.funciones = new Map();
    }
    // imprimir arreglos en el map
    imprimirArreglos() {
        console.log("============= IMPRIMIENDO ARREGLOS =============");
        this.arreglos.forEach((arreglo, key) => {
            console.log(key, arreglo.valor);
        });
        console.log("===============================================");
    }
    // imprimir funciones en el map
    imprimirFunciones() {
        console.log("============= IMPRIMIENDO FUNCIONES =============");
        this.funciones.forEach((funcion, key) => {
            console.log(key, funcion);
        });
        console.log("===============================================");
    }
    // guardar variable
    guardarVariable(id, valor, tipoDato, esConstante, linea, columna) {
        let entorno = this;
        if (entorno.variables.has(id)) {
            throw Error("Esta variable ya existe");
        }
        else if (entorno.arreglos.has(id)) {
            throw Error("Este ID es un arreglo");
        }
        else if (entorno.funciones.has(id)) {
            throw Error("Este ID es una función");
        }
        const simbolo = new Simbolo_1.Simbolo(id, valor, tipoDato, esConstante, linea, columna);
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
        else if (this.funciones.has(id)) {
            throw new Error("Este ID es una función");
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
    // guardar funcion
    guardarFuncion(id, funcion) {
        let entorno = this;
        if (entorno.funciones.has(id)) {
            throw new Error("Esta función ya existe");
        }
        else if (entorno.variables.has(id)) {
            throw new Error("Este ID es una variable");
        }
        else if (entorno.arreglos.has(id)) {
            throw new Error("Este ID es un arreglo");
        }
        this.funciones.set(id, funcion);
    }
    // obtener funcion
    obtenerFuncion(id) {
        let entorno = this;
        while (entorno != null) {
            if (entorno.funciones.has(id)) {
                return entorno.funciones.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return undefined;
    }
    // obtener entorno global
    obtenerEntornoGlobal() {
        let entorno = this;
        while ((entorno === null || entorno === void 0 ? void 0 : entorno.entornoPadre) != null) {
            entorno = entorno.entornoPadre;
        }
        return entorno;
    }
}
exports.Entorno = Entorno;
