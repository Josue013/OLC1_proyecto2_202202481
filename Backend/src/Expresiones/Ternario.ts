import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Ternario extends Expresion {
  condicion: Expresion; // Expresión que representa la condición del operador ternario
  instruccionV: Expresion; // Expresión que se ejecuta si la condición es verdadera
  instruccionF: Expresion; // Expresión que se ejecuta si la condición es falsa

  constructor(condicion: Expresion, instruccionV: Expresion, instruccionF: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.condicion = condicion;
    this.instruccionV = instruccionV;
    this.instruccionF = instruccionF;
  }

  public calcular(entorno: Entorno): Resultado {
    const condicion = this.condicion.calcular(entorno); // Calcula el valor de la condición
    // Verifica que el tipo de dato de la condición sea booleano
    if (condicion.tipoDato != TipoDato.BOOLEANO) {
      throw new Error("La condición no es booleana");
    }
    // Si la condición es verdadera, calcula y retorna el valor de instruccionV
    if (condicion.valor) {
      return this.instruccionV.calcular(entorno);
    } else {
      // Si la condición es falsa, calcula y retorna el valor de instruccionF
      return this.instruccionF.calcular(entorno);
    }
  }
}