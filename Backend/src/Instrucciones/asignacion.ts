import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Resultado, TipoDato } from "../Expresiones/Tipos";

export class Asignacion extends Instruccion {
    private id: string; // Identificador de la variable o vector a asignar
    private expresion: Expresion; // Expresión cuyo valor se asignará

    constructor(id: string, expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    public ejecutar(entorno: Entorno) {
        const simbolo = entorno.obtenerVariable(this.id); // Obtiene la variable del entorno
        if (simbolo) {
            // Verifica si la variable es constante
            if (simbolo.esConstante) {
                throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
            }
            const nuevoValor: Resultado = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
            // Verifica que el tipo de dato coincida
            if (nuevoValor.tipoDato !== simbolo.obtenertipoDato()) {
                throw new Error(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`);
            }
            simbolo.setValor(nuevoValor); // Asigna el nuevo valor a la variable
            simbolo.actualizarValor(nuevoValor); // Actualiza el valor de la variable en el entorno
            console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        } else {
            const vector = entorno.obtenerArreglo(this.id); // Obtiene el vector del entorno
            if (vector) {
                const nuevoValor: Resultado = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
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
                
                entorno.obtenerArreglo(this.id)?.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el entorno
                vector.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el vector
                entorno.actualizarArreglo(this.id, vector); // Actualiza el vector en el entorno
                console.log(`Asignación de vector ${this.id} con valores del vector ${nuevoValor.valor}`);
            } else {
                throw new Error(`La variable o vector ${this.id} no existe`);
            }
        }
    }
}