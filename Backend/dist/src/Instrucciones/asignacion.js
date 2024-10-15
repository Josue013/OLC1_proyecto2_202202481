"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Instruccion_1 = require("./Instruccion");
class Asignacion extends Instruccion_1.Instruccion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }
    ejecutar(entorno) {
        var _a;
        const simbolo = entorno.obtenerVariable(this.id); // Obtiene la variable del entorno
        if (simbolo) {
            // Verifica si la variable es constante
            if (simbolo.esConstante) {
                throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
            }
            const nuevoValor = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
            // Verifica que el tipo de dato coincida
            if (nuevoValor.tipoDato !== simbolo.obtenertipoDato()) {
                throw new Error(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`);
            }
            simbolo.setValor(nuevoValor); // Asigna el nuevo valor a la variable
            simbolo.actualizarValor(nuevoValor); // Actualiza el valor de la variable en el entorno
            console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        }
        else {
            const vector = entorno.obtenerArreglo(this.id); // Obtiene el vector del entorno
            if (vector) {
                const nuevoValor = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
                const vector2 = entorno.obtenerArreglo(nuevoValor.valor); // Obtiene el vector a asignar
                if (!vector2) {
                    throw new Error(`Vector ${nuevoValor.valor} no existe`);
                }
                // Verifica que los tipos de datos coincidan
                if (vector.tipo !== vector2.tipo) {
                    throw new Error(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato del vector ${nuevoValor.valor}`);
                }
                // Verifica que las dimensiones de los vectores coincidan
                if (vector.valor.length !== vector2.valor.length || vector.valor[0].length !== vector2.valor[0].length) {
                    throw new Error(`Vector ${vector2.id} no tiene las mismas dimensiones que ${vector.id}`);
                }
                (_a = entorno.obtenerArreglo(this.id)) === null || _a === void 0 ? void 0 : _a.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el entorno
                vector.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el vector
                entorno.actualizarArreglo(this.id, vector); // Actualiza el vector en el entorno
                console.log(`Asignación de vector ${this.id} con valores del vector ${nuevoValor.valor}`);
            }
            else {
                throw new Error(`La variable o vector ${this.id} no existe`);
            }
        }
    }
}
exports.Asignacion = Asignacion;
