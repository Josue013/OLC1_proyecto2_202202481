import { Entorno } from "../Entorno/Entorno";
import { Resultado } from "./Tipos";

export abstract class  Expresion {
    public linea: number;
    public columna: number;

    constructor(linea:number,columna:number){
        this.linea = linea; 
        this.columna = columna;
    }

    public abstract calcular(entorno:Entorno):Resultado;
    public abstract getAST(anterior: string): string;
}