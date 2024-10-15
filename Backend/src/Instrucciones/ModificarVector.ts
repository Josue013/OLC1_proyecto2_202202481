import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";
import { Instruccion } from "./Instruccion";

export class ModificarVector extends Instruccion {
  
  private id: string;               // Identificador del vector
  private exp1: Expresion;          // Expresión que representa la primera dimensión del vector
  private exp2: Expresion | null;   // Expresión que representa la segunda dimensión del vector (puede ser nula)
  private value: Expresion;         // Valor a asignar en la posición especificada del vector
  
  constructor(id: string, exp1: Expresion, exp2: Expresion | null, value: Expresion, line: number, column: number) {
    super(line, column);
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.value = value;
  }

  public ejecutar(entorno: Entorno): null {
    // Obtiene el vector del entorno
    const vector = entorno.obtenerArreglo(this.id);

    // Verificar que this.value sea una instancia de Expresion
    if (!(this.value instanceof Expresion)) {
      throw new Error(`El valor proporcionado no es una expresión válida`);
    }

    // Calcula el valor de la expresión
    const value = this.value.calcular(entorno);

    if (vector == null) {
      throw new Error(`La variable o vector ${this.id} no existe`);
    }

    if (vector.tipo != value.tipoDato) {
      throw new Error(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`);
    }

     // Calcula la posición en la primera dimensión
    const exp1Resultado = this.exp1.calcular(entorno);

    if (this.exp2 != null) {
      // Calcula la posición en la segunda dimensión
      const exp2Resultado = this.exp2.calcular(entorno);
      if (exp1Resultado.tipoDato != TipoDato.ENTERO || exp2Resultado.tipoDato != TipoDato.ENTERO) {
        throw new Error(`Tipo de dato no valido para la posicion del vector`);
      }
      // Asigna el valor en la posición especificada del vector
      entorno.obtenerArreglo(this.id)?.asignarValor(exp1Resultado.valor, exp2Resultado.valor, vector.id, vector.tipo, value.valor, this.linea, this.columna);
    } else {
      if (exp1Resultado.tipoDato != TipoDato.ENTERO) {
        throw new Error(`Tipo de dato no valido para la posicion del vector`);
      }
      // Asigna el valor en la posición especificada del vector (unidimensional)
      entorno.obtenerArreglo(this.id)?.asignarValor(exp1Resultado.valor, 0, vector.id, vector.tipo, value.valor, this.linea, this.columna);
    }
    return null;
  }
}