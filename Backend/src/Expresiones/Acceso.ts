import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Acceso extends Expresion{
    constructor(private id:string,linea:number,columna:number){
        super(linea,columna)
    }
    public calcular(entorno:Entorno): Resultado {

        // VARIABLES
        const value = entorno.obtenerVariable(this.id);
        if (value != null) {
            return {valor:value.getValor().valor,tipoDato:value.tipoDato}
        }

        // VECTORES
        const vector = entorno.obtenerArreglo(this.id);
        if (vector != null) {
            return {valor: vector.id, tipoDato: vector.tipo};
        }

        throw new Error(`La variable o vector ${this.id} no existe`);
    }
}