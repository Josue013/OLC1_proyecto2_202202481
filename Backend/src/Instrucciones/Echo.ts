import { imprimir } from "../AST/AST";
import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";

export class Echo extends Instruccion{

    constructor(private exp:Expresion,linea:number,columna:number){
        super(linea,columna)
    }

    public ejecutar(entorno:Entorno) {
        console.log("")
        console.log("======== Ejecutando echo ==========")
        const exp1 = this.exp.calcular(entorno);
        console.log(exp1)
        imprimir(exp1.valor)
        console.log("===================================")
    }
}