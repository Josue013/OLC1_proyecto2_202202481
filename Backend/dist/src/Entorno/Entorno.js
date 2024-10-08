"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Simbolo_1 = require("./Simbolo");
class Entorno {
    constructor(entornoPadre) {
        this.entornoPadre = entornoPadre;
        this.variables = new Map();
    }
    guardarVariable(id, valor, tipoDato, esConstante, linea, columna) {
        const simbolo = new Simbolo_1.Simbolo(id, valor, tipoDato, esConstante, linea, columna);
        if (this.variables.has(id))
            throw Error("Esta variable ya existe");
        this.variables.set(id, simbolo);
    }
    actualiarVariable(id, valor) {
        if (!this.variables.has(id))
            throw new Error("Esta variable no existe");
        const variable = this.variables.get(id);
        variable === null || variable === void 0 ? void 0 : variable.setValor(valor);
    }
    actualizarSimbolo(id, valor) {
        this.variables.set(id, valor);
    }
    obtenerVariable(id) {
        let entorno = this;
        while (entorno != null) {
            if (entorno.variables.has(id)) {
                return entorno.variables.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return undefined;
    }
}
exports.Entorno = Entorno;
