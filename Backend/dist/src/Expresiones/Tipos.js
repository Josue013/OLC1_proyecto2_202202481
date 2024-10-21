"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoDato = void 0;
exports.getDataTypeName = getDataTypeName;
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["ENTERO"] = 0] = "ENTERO";
    TipoDato[TipoDato["DECIMAL"] = 1] = "DECIMAL";
    TipoDato[TipoDato["BOOLEANO"] = 2] = "BOOLEANO";
    TipoDato[TipoDato["CHAR"] = 3] = "CHAR";
    TipoDato[TipoDato["STRING"] = 4] = "STRING";
    TipoDato[TipoDato["NULO"] = 5] = "NULO";
    TipoDato[TipoDato["ID"] = 6] = "ID"; // 6
})(TipoDato || (exports.TipoDato = TipoDato = {}));
function getDataTypeName(value) {
    return TipoDato[value];
}
