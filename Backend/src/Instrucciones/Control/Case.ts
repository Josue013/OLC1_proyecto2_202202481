import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Entorno } from "../../Entorno/Entorno";

export class Case extends Instruccion {
  cond: Expresion;
  ins: Instruccion[];

  constructor(cond: Expresion, ins: Instruccion[], line: number, column: number) {
    super(line, column);
    this.cond = cond;
    this.ins = ins;
  }

  public ejecutar(entorno: Entorno): any {
      for (const instruccion of this.ins) {
        try {
          const cs = instruccion.ejecutar(entorno);
          if (cs != null || cs != undefined) {
            return cs;
          }
        } catch (error) {
          console.log(error);
        }
        
      }
  }

}