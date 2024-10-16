import { Resultado, TipoDato } from "../../Expresiones/Tipos";
import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Return } from "../Return";

export class For extends Instruccion {

  constructor (private Declaracion: Instruccion, private cond: Expresion, private incremento: Instruccion, private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno): any {
    const nuevoEntorno = new Entorno(entorno);
    this.Declaracion.ejecutar(nuevoEntorno);
    let cond = this.cond.calcular(nuevoEntorno);

    // Verificar que la condición sea de tipo booleano
    if (cond.tipoDato !== TipoDato.BOOLEANO) {
      throw new Error("La condición del bucle for debe ser de tipo booleano");
    }

    while (cond.valor === true) {
      const transfer: any = this.instrucciones.ejecutar(nuevoEntorno); // Declarar transfer como any
      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break;
        } else if (transfer instanceof Continue) {
          this.incremento.ejecutar(nuevoEntorno);
          cond = this.cond.calcular(nuevoEntorno);
          continue;
        } else if (transfer instanceof Return) {
          return transfer;
        } else {
          throw new Error("Error en For");
        }
      }
      this.incremento.ejecutar(nuevoEntorno);
      cond = this.cond.calcular(nuevoEntorno);

      // Verificar que la condición siga siendo de tipo booleano después del incremento
      if (cond.tipoDato !== TipoDato.BOOLEANO) {
        throw new Error("La condición del bucle for debe ser de tipo booleano");
      }
    }
  }

}