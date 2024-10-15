import e from "express";
import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";

export class Return extends Instruccion{
  constructor(line:number, column:number, private valor: Expresion | null){
      super(line,column)
      this.valor = valor;
  }
  public ejecutar(entorno: Entorno): any {
    if(this.valor != null){
      const exp = this.valor.calcular(entorno);
      console.log(exp);
      return exp;
    } else {
      return null;
    }
  }
}