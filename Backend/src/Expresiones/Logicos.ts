import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Logico extends Expresion{

    constructor(private exp1:Expresion,private exp2:Expresion, private operador:OperadorLogico, linea:number, columna:number){
        super(linea,columna)
    }

    public calcular(entorno:Entorno): Resultado {
        const exp1 = this.exp1.calcular(entorno)        
        const exp2 = this.exp2.calcular(entorno)        

        if (exp1.tipoDato!=TipoDato.BOOLEANO)
            throw new Error("El tipo de dato no es booleano")
        if (exp2.tipoDato!=TipoDato.BOOLEANO)
            throw new Error("El tipo de dato no es booleano")

        // AND
        if (this.operador==OperadorLogico.AND)
            return {valor:exp1.valor&&exp2.valor,tipoDato:TipoDato.BOOLEANO}
        // OR
        if (this.operador==OperadorLogico.OR)
            return {valor:exp1.valor||exp2.valor,tipoDato:TipoDato.BOOLEANO}
        // NOT
        if (this.operador==OperadorLogico.NOT)
            return {valor:!exp1.valor,tipoDato:TipoDato.BOOLEANO}
        throw new Error("Verificar operador relacional")
   }
}

export enum OperadorLogico {
    AND,
    OR,
    NOT
}