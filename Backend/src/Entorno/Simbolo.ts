import { Resultado, TipoDato } from "../Expresiones/Tipos";

export class Simbolo {
    constructor(private id:string,private valor:any,public tipoDato:TipoDato,linea:number,columna:number){

    }
    
    public getValor() : any {
        return  this.valor
    }

    
    public setValor(v : Resultado) {
        if(v.tipoDato!=this.tipoDato)
            throw Error("Verificar tipos de dato en la asignación de: "+this.id)
        this.valor = v.valor;
    }
    
    
}