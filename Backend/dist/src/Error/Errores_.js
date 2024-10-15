"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoError = exports.Error_ = void 0;
class Error_ {
    constructor(descripcion, linea, columna, tipo) {
        this.columna = columna;
        this.descripcion = descripcion;
        this.linea = linea;
        this.tipo = tipo;
    }
    toString() {
        return `Error ${this.tipo}: ${this.descripcion} en linea: ${this.linea} y columna: ${this.columna}`;
    }
}
exports.Error_ = Error_;
var TipoError;
(function (TipoError) {
    TipoError["LEXICO"] = "Lexico";
    TipoError["SINTACTICO"] = "Sintactico";
    TipoError["SEMANTICO"] = "Semantico";
})(TipoError || (exports.TipoError = TipoError = {}));
