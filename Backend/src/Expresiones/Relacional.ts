import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Relacional extends Expresion{

    constructor(private exp1:Expresion,private exp2:Expresion, private operador:OperadorRelacional, linea:number, columna:number){
        super(linea,columna)
    }

    public calcular(entorno:Entorno): Resultado {
        const exp1 = this.exp1.calcular(entorno)        
        const exp2 = this.exp2.calcular(entorno)        
        const tipoBool = DominanteRelacional[exp1.tipoDato][exp2.tipoDato]
        if (tipoBool!=TipoDato.BOOLEANO)
            throw agregarError(new Error_("Verifique los tipos de datos para: "+this.operador, this.linea, this.columna, TipoError.SEMANTICO));
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
        throw agregarError(new Error_("Verificar operador relacional", this.linea, this.columna, TipoError.SEMANTICO));

    }

    /* EXPRESION OPERADOR EXPRESION */

    public getAST(anterior: string): string {
        let result = "";
        let counter = Contador.getInstancia();
        let relacionalNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let operadorNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
    
        result += `${relacionalNode}[label="Operador Relacional"];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${operadorNode}[label="${this.getOperador()}"];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;
    
        result += `${anterior} -> ${relacionalNode};\n`;
        result += `${relacionalNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${relacionalNode} -> ${operadorNode};\n`;
        result += `${relacionalNode} -> ${exp2Node};\n`;
        result += this.exp2.getAST(exp2Node);
    
        return result;
      }
    
      private getOperador(): string {
        switch (this.operador) {
          case OperadorRelacional.IGUALDAD:
            return "==";
          case OperadorRelacional.DISTINTO:
            return "!=";
          case OperadorRelacional.MENOR:
            return "<";
          case OperadorRelacional.MENORIGUAL:
            return "<=";
          case OperadorRelacional.MAYOR:
            return ">";
          case OperadorRelacional.MAYORIGUAL:
            return ">=";
          default:
            return "";
        }
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