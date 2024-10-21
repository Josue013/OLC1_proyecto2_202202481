import { TipoDato } from "./Tipos"
import { Resultado } from "./Tipos"
import { Expresion } from "./Expresion"
import Contador from "../Entorno/Contador"

export class Basico extends Expresion{
    private valor:string
    private tipo:TipoDato
    constructor(valor:string,tipo:TipoDato,linea:number,columna:number){
        super(linea,columna)
        this.tipo = tipo
        this.valor = valor
    }

    public calcular(): Resultado {
        // Enteros
        if (this.tipo==TipoDato.ENTERO)
            return {valor:parseInt(this.valor),tipoDato:this.tipo}
        // Decimales
        if (this.tipo==TipoDato.DECIMAL)
            return {valor:parseFloat(this.valor),tipoDato:this.tipo}
        // Booleanos
        if (this.tipo==TipoDato.BOOLEANO)
            if (this.valor.toLocaleLowerCase()=="true")
                return {valor:true,tipoDato:this.tipo}
            else
                return {valor:false,tipoDato:this.tipo}
        // Strings 
        if (this.tipo==TipoDato.STRING)
            return {valor:this.valor.toString(),tipoDato:this.tipo} 
        // Caracter
        if (this.tipo==TipoDato.CHAR)
            return {valor:this.valor, tipoDato:this.tipo} 
        // Nulo
        return {valor:null,tipoDato:TipoDato.NULO} 
    }

    public getAST(last: string): string {
        let counter = Contador.getInstancia();
        let basicoNode = `n${counter.get()}`;
        let valueNode = `n${counter.get()}`;
        let result = `${basicoNode}[label="Basico"];\n`;
        result += `${valueNode}[label="${this.valor}"];\n`;
        result += `${basicoNode} -> ${valueNode};\n`;
        result += `${last} -> ${basicoNode};\n`;
        return result;
    }

}