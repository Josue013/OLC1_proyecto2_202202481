import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Simbolo } from "./Simbolo";

export class Entorno {
    public variables: Map<string,Simbolo>
    
    public entornoPadre:Entorno | null
    constructor(entornoPadre:Entorno | null){
       this.entornoPadre = entornoPadre 
       this.variables = new Map<string,Simbolo>
    }

    guardarVariable(id:string,valor:Resultado,tipoDato:TipoDato,linea:number,columna:number){
        const simbolo = new Simbolo(id,valor,tipoDato,linea,columna)
        if (this.variables.has(id))
            throw Error("Esta variable ya existe")
        this.variables.set(id,simbolo)
    }

    actualiarVariable(id:string,valor:Resultado){
        if (!this.variables.has(id))
            throw Error("Esta variable no existe")
        const variable = this.variables.get(id)
        variable?.setValor(valor)
    }

    obtenerVariable(id:string): Simbolo | undefined{
        let entorno: Entorno | null = this
        while(entorno!=null){
            if (this.variables.has(id))
                return this.variables.get(id)
            entorno = entorno.entornoPadre
        }
        throw Error("La variable no existe")
    }

}