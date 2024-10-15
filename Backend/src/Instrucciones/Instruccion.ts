import { Entorno } from "../Entorno/Entorno";

export abstract class  Instruccion{
    public linea:number;
    public columna:number;

    constructor(linea:number,columna:number){
        this.columna = columna
        this.linea = linea 
    }

    public abstract ejecutar(entorno:Entorno): any | null;
}