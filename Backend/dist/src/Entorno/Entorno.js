"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entorno = void 0;
const Simbolo_1 = require("./Simbolo");
class Entorno {
    constructor(entornoPadre) {
        this.entornoPadre = entornoPadre;
        this.variables = new Map;
    }
    guardarVariable(id, valor, tipoDato, linea, columna) {
        const simbolo = new Simbolo_1.Simbolo(id, valor, tipoDato, linea, columna);
        if (this.variables.has(id))
            throw Error("Esta variable ya existe");
        this.variables.set(id, simbolo);
    }
    actualiarVariable(id, valor) {
        if (!this.variables.has(id))
            throw Error("Esta variable no existe");
        const variable = this.variables.get(id);
        variable === null || variable === void 0 ? void 0 : variable.setValor(valor);
    }
    obtenerVariable(id) {
        let entorno = this;
        while (entorno != null) {
            if (this.variables.has(id))
                return this.variables.get(id);
            entorno = entorno.entornoPadre;
        }
        throw Error("La variable no existe");
    }
}
exports.Entorno = Entorno;
