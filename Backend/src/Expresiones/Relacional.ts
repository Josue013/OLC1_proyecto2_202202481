import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Relacional extends Expresion{

    constructor(private exp1:Expresion,private exp2:Expresion, private operador:OperadorRelacional, linea:number, columna:number){
        super(linea,columna)
    }

    public calcular(entorno:Entorno): Resultado {
        const exp1 = this.exp1.calcular(entorno)        
        const exp2 = this.exp2.calcular(entorno)        
        const tipoBool = DominanteRelacional[exp1.tipoDato][exp2.tipoDato]
        if (tipoBool!=TipoDato.BOOLEANO)
            throw new Error("Verifique los tipos de datos para: "+this.operador)
        // igualdad
        if (this.operador==OperadorRelacional.IGUALDAD)
            return {valor:exp1.valor==exp2.valor,tipoDato:tipoBool}
        // distinto
        if (this.operador==OperadorRelacional.DISTINTO)
            return {valor:exp1.valor!=exp2.valor,tipoDato:tipoBool}
        // menor
        if (this.operador==OperadorRelacional.MENOR)
            return {valor:exp1.valor<exp2.valor,tipoDato:tipoBool}
        // menor igual
        if (this.operador==OperadorRelacional.MENORIGUAL)
            return {valor:exp1.valor<=exp2.valor,tipoDato:tipoBool}
        // mayor
        if (this.operador==OperadorRelacional.MAYOR)
            return {valor:exp1.valor>exp2.valor,tipoDato:tipoBool}
        // mayor igual
        if (this.operador==OperadorRelacional.MAYORIGUAL)
            return {valor:exp1.valor>=exp2.valor,tipoDato:tipoBool}
        // error
        throw new Error("Verificar operador relacional")
    }
}

const DominanteRelacional = [
    [TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO],
    [TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO],
    [TipoDato.NULO,TipoDato.NULO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.NULO,TipoDato.BOOLEANO],
    [TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO,TipoDato.NULO,TipoDato.BOOLEANO],
    [TipoDato.NULO,TipoDato.NULO,TipoDato.NULO,TipoDato.NULO,TipoDato.BOOLEANO,TipoDato.BOOLEANO],
    [TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.BOOLEANO,TipoDato.BOOLEANO],
]



export enum OperadorRelacional {
    IGUALDAD,
    DISTINTO,
    MENOR,
    MENORIGUAL,
    MAYOR,
    MAYORIGUAL
}