import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../../Expresiones/Expresion";
import { TipoDato } from "../../Expresiones/Tipos";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";

export class Fn_if extends Instruccion{
    constructor(private condicion:Expresion,private instruccionesV:Bloque,private instruccionesF:Bloque,private elseif:Fn_if){
        super(0,0);
    }
    public ejecutar(entorno: Entorno) {
        const condicion = this.condicion.calcular(entorno);
        if (condicion.tipoDato!=TipoDato.BOOLEANO)
            throw new Error("La condición no es booleana");
        if (condicion.valor==true){
            this.instruccionesV.ejecutar(entorno);
        }else{
            if(this.instruccionesF!=null){//Else
                this.instruccionesF.ejecutar(entorno)
            }else{ //Caso Elseif
                this.elseif.ejecutar(entorno)
            }
        }
    }
}
