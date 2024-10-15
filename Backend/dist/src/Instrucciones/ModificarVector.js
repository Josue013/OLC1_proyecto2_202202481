"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarVector = void 0;
const Expresion_1 = require("../Expresiones/Expresion");
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
class ModificarVector extends Instruccion_1.Instruccion {
    constructor(id, exp1, exp2, value, line, column) {
        super(line, column);
        this.id = id;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.value = value;
    }
    ejecutar(entorno) {
        var _a, _b;
        // Obtiene el vector del entorno
        const vector = entorno.obtenerArreglo(this.id);
        // Verificar que this.value sea una instancia de Expresion
        if (!(this.value instanceof Expresion_1.Expresion)) {
            throw new Error(`El valor proporcionado no es una expresión válida`);
        }
        // Calcula el valor de la expresión
        const value = this.value.calcular(entorno);
        if (vector == null) {
            throw new Error(`La variable o vector ${this.id} no existe`);
        }
        if (vector.tipo != value.tipoDato) {
            throw new Error(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`);
        }
        // Calcula la posición en la primera dimensión
        const exp1Resultado = this.exp1.calcular(entorno);
        if (this.exp2 != null) {
            // Calcula la posición en la segunda dimensión
            const exp2Resultado = this.exp2.calcular(entorno);
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO || exp2Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                throw new Error(`Tipo de dato no valido para la posicion del vector`);
            }
            // Asigna el valor en la posición especificada del vector
            (_a = entorno.obtenerArreglo(this.id)) === null || _a === void 0 ? void 0 : _a.asignarValor(exp1Resultado.valor, exp2Resultado.valor, vector.id, vector.tipo, value.valor, this.linea, this.columna);
        }
        else {
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                throw new Error(`Tipo de dato no valido para la posicion del vector`);
            }
            // Asigna el valor en la posición especificada del vector (unidimensional)
            (_b = entorno.obtenerArreglo(this.id)) === null || _b === void 0 ? void 0 : _b.asignarValor(exp1Resultado.valor, 0, vector.id, vector.tipo, value.valor, this.linea, this.columna);
        }
        return null;
    }
}
exports.ModificarVector = ModificarVector;
