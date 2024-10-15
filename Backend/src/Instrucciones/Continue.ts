import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "./Instruccion";

export class Continue extends Instruccion{
  constructor(line:number, column:number){
      super(line,column)
  }
  public ejecutar(entorno: Entorno) {
      return this
  }
}