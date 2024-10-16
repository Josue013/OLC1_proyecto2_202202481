import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Return } from "../Return";

export class Loop extends Instruccion {

  constructor(private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno): any {
    while (true) { // Bucle infinito
      const transfer: any = this.instrucciones.ejecutar(entorno); // Ejecutar las instrucciones

      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break; // Salir del bucle si se encuentra un break
        } else if (transfer instanceof Return) {
          return transfer; // Retornar el valor si se encuentra un return
        } else if (transfer instanceof Continue) {
          continue; // Continuar con la siguiente iteración si se encuentra un continue
        } else {
          throw new Error("Error en Loop");
        }
      }
    }
  }
}