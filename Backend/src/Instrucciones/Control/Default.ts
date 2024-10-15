import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Return } from "../Return";

export class Default extends Instruccion {
  ins: Instruccion[];

  constructor(ins: Instruccion[], line: number, column: number) {
    super(line, column);
    this.ins = ins;
  }

  public ejecutar(entorno: Entorno): any {
    for (const instruccion of this.ins) {
      try {
        const cs = instruccion.ejecutar(entorno);
        if (cs != null || cs != undefined) {
          if (cs instanceof Break){
            break;
          } 
          else if(cs instanceof Return){
            return cs;
          }
          else {
            throw new Error("Error en Case");
          }
        }
      } catch (error) {
        console.log(error);

      }
    }
  }
}
