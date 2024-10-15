import { Resultado, TipoDato } from "./Tipos";
import { Expresion } from "./Expresion";
import { Entorno } from "../Entorno/Entorno";

export class AccesoVector extends Expresion {
  public id: string;
  public exp1: Expresion;
  public exp2: Expresion | null;

  constructor(id: string, exp1: Expresion, exp2: Expresion | null, linea: number, columna: number) {
    super(linea, columna);
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  public calcular(entorno: Entorno): Resultado {
    entorno.imprimirArreglos();

    const vector = entorno.obtenerArreglo(this.id);
    const exp1 = this.exp1.calcular(entorno);
    
    if (exp1.tipoDato != TipoDato.ENTERO) {
      throw new Error("La posición exp1 debe ser de tipo entero");
    }

    let exp2;
    if (this.exp2 != null) {
      exp2 = this.exp2.calcular(entorno).valor;
    } else {
      exp2 = 0;
    }

    if (vector == null) {
      throw new Error(`El vector ${this.id} no existe`);
    }

    let valor = vector.obtenerValor(exp1.valor, exp2).valor;

    // Desanidar el valor si es necesario
    while (valor && typeof valor === 'object' && 'valor' in valor) {
      valor = valor.valor;
    }

    return { valor: valor, tipoDato: vector.tipo };
  }
}