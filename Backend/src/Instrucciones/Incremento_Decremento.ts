import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Resultado, TipoDato } from "../Expresiones/Tipos";

export class Incremento_Decremento extends Instruccion {
  private id: string;
  private signo: string;

  constructor(id: string, signo: string, linea: number, columna: number) {
    super(linea, columna);
    this.id = id;
    this.signo = signo;
  }

  public ejecutar(entorno: Entorno) {
    const simbolo = entorno.obtenerVariable(this.id);
    if (simbolo) {
      if (simbolo.esConstante) {
        throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
      }
      let nuevoValor: Resultado = { valor: 0, tipoDato: simbolo.obtenertipoDato() };
      if (simbolo.obtenertipoDato() == TipoDato.ENTERO || simbolo.obtenertipoDato() == TipoDato.DECIMAL) {
        if (this.signo == "++") {
          nuevoValor.valor = simbolo.getValor().valor + 1;
        } else if (this.signo == "--") {
          nuevoValor.valor = simbolo.getValor().valor - 1;
        } else {
          throw new Error(`Operador ${this.signo} no permitido`);
        }
      } else {
        throw new Error(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${TipoDato.ENTERO} o ${TipoDato.DECIMAL}`);
      }
      simbolo.setValor(nuevoValor);
      simbolo.actualizarValor(nuevoValor);
      //entorno.actualizarSimbolo(this.id, simbolo);
      console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
    } else {
      throw new Error(`La variable ${this.id} no existe`);
    }
  }
}