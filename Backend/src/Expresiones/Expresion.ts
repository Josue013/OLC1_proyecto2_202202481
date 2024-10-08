import { Entorno } from "../Entorno/Entorno";
import { Resultado } from "./Tipos";

export abstract class  Expresion {
    private linea:number;
    private columna:number;

    constructor(linea:number,columna:number){
        this.columna = columna
        this.linea = linea 
    }

    public abstract calcular(entorno:Entorno):Resultado;
}