"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("../Expresiones/Expresion");
const Tipos_1 = require("../Expresiones/Tipos");
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, exp, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.exp = exp;
    }
    calcular(entorno) {
        const expResultado = this.exp.calcular(entorno);
        let resultado;
        switch (this.tipo) {
            case "char":
                if (expResultado.tipoDato == Tipos_1.TipoDato.ENTERO) {
                    resultado = { valor: String.fromCharCode(expResultado.valor), tipoDato: Tipos_1.TipoDato.CHAR };
                }
                else {
                    throw new Error(`Tipo ${expResultado.tipoDato} no casteable a char`);
                }
                break;
            case "string":
                if (expResultado.tipoDato == Tipos_1.TipoDato.ENTERO || expResultado.tipoDato == Tipos_1.TipoDato.DECIMAL) {
                    resultado = { valor: expResultado.valor.toString(), tipoDato: Tipos_1.TipoDato.STRING };
                }
                else {
                    throw new Error(`Tipo ${expResultado.tipoDato} no casteable a string`);
                }
                break;
            case "int":
                switch (expResultado.tipoDato) {
                    case Tipos_1.TipoDato.ENTERO:
                        resultado = { valor: expResultado.valor, tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    case Tipos_1.TipoDato.DECIMAL:
                        resultado = { valor: Math.floor(expResultado.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    case Tipos_1.TipoDato.CHAR:
                        resultado = { valor: expResultado.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    default:
                        throw new Error(`Tipo ${expResultado.tipoDato} no casteable a int`);
                }
                break;
            case "double":
                switch (expResultado.tipoDato) {
                    case Tipos_1.TipoDato.ENTERO:
                        // Redondear a 4 decimales
                        resultado = { valor: parseFloat(expResultado.valor).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    case Tipos_1.TipoDato.DECIMAL:
                        // Redondear a 4 decimales
                        resultado = { valor: expResultado.valor.toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    case Tipos_1.TipoDato.CHAR:
                        // Redondear a 4 decimales
                        resultado = { valor: expResultado.valor.charCodeAt(0).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    default:
                        throw new Error(`Tipo ${expResultado.tipoDato} no casteable a double`);
                }
                break;
            default:
                throw new Error(`Opción casteable no valida ${this.tipo}`);
        }
        return resultado;
    }
}
exports.Casteo = Casteo;
