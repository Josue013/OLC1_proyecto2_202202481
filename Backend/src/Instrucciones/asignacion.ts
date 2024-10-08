import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Resultado, TipoDato } from "../Expresiones/Tipos";

export class Asignacion extends Instruccion {
    private id: string;
    private expresion: Expresion;

    constructor(id: string, expresion: Expresion, linea: number, columna: number) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }

    public ejecutar(entorno: Entorno) {
        const simbolo = entorno.obtenerVariable(this.id);
        if (simbolo) {
            if (simbolo.esConstante) {
                throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
                
            }
            const nuevoValor: Resultado = this.expresion.calcular(entorno);
            if (nuevoValor.tipoDato !== simbolo.obtenertipoDato()) {
                throw new Error(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`);
            }
            simbolo.setValor(nuevoValor);
            simbolo.actualizarValor(nuevoValor);
            entorno.actualizarSimbolo(this.id, simbolo);
            console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        } else {
            throw new Error(`La variable ${this.id} no existe`);
        }
    }
}