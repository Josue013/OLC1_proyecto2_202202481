import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado } from "./Tipos";

export class Acceso extends Expresion{
    constructor(private id:string,linea:number,columna:number){
        super(linea,columna)
    }
    public calcular(entorno:Entorno): Resultado {
        const variable = entorno.obtenerVariable(this.id)
        if (variable)
            return {valor:variable.getValor().valor,tipoDato:variable.tipoDato}
        throw Error("La variable no existe")
    }
}