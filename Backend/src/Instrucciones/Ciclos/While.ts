import { Resultado, TipoDato } from "../../Expresiones/Tipos";
import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Continue } from "../Continue";



export class CWhile extends Instruccion {

  constructor(private condicion: Expresion, private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno) {
    let cond = this.condicion.calcular(entorno);
    if (cond.tipoDato!=TipoDato.BOOLEANO) 
        throw new Error("La condición no es booleana");
    while (cond.valor==true){
        const transfer = this.instrucciones.ejecutar(entorno);
        if (transfer instanceof Break) break;
        if (transfer instanceof Continue) continue;
        
        cond = this.condicion.calcular(entorno);
    }
  }
}