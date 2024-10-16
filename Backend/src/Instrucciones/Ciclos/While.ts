import { Resultado, TipoDato } from "../../Expresiones/Tipos";
import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Return } from "../Return";

export class CWhile extends Instruccion {

  constructor(private condicion: Expresion, private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno) {
    let cond = this.condicion.calcular(entorno);
    
    // Verificar que la condición sea de tipo booleano
    if (cond.tipoDato != TipoDato.BOOLEANO) {
      throw new Error("La condición no es booleana");
    }

    while (cond.valor === true) {
      const transfer: any = this.instrucciones.ejecutar(entorno); // Declarar transfer como any
      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break;
        } else if (transfer instanceof Continue) {
          cond = this.condicion.calcular(entorno); // Recalcular la condición después de continue
          continue;
        } else if (transfer instanceof Return) {
          return transfer;
        } else {
          throw new Error("Error en While");
        }
      }
      cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración

      // Verificar que la condición siga siendo de tipo booleano después de cada iteración
      if (cond.tipoDato != TipoDato.BOOLEANO) {
        throw new Error("La condición no es booleana");
      }
    }
  }
}