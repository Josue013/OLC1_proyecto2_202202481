import { Simbolo } from "./Simbolo";
import { TipoDato } from "../Expresiones/Tipos";

export class Arreglo {
  public id: string;
  public valor: Simbolo[][];
  public tipo: TipoDato;
  public linea: number;
  public columna: number;

  constructor(id: string, tipo: TipoDato, exp1: number, exp2: number, linea: number, columna: number) {
    this.id = id;
    this.tipo = tipo;
    this.linea = linea;
    this.columna = columna;
    // valores de la matriz
    // [exp1][exp2]
    this.valor = new Array(exp1); // [exp1]
    for (let i = 0; i < exp1; i++) {
      this.valor[i] = new Array(exp2); // [exp2]
    }
  }

  // obtener valor de la matriz
  public obtenerValor(fila: number, columna: number) {
    if (fila < 0 || fila >= this.valor.length || columna < 0 || columna >= this.valor[0].length) {
      throw new Error("Índice fuera de los límites");
    }
    return this.valor[fila][columna];
  }

  // asignar valor a la matriz
  public asignarValor(fila: number, columna: number, id: string, tipo: TipoDato, valor: any, line: number, column: number) {
    if (fila < 0 || fila >= this.valor.length || columna < 0 || columna >= this.valor[0].length) {
      throw new Error("Índice fuera de los límites");
    }
    this.valor[fila][columna] = new Simbolo(id, valor, tipo, false, line, column);
  }

  // inicializar valores predeterminados
  public inicializarValoresPredeterminados(id: string, tipo: TipoDato, valor: any, linea: number, columna: number) {
    for (let i = 0; i < this.valor.length; i++) {
      for (let j = 0; j < this.valor[i].length; j++) {
        this.valor[i][j] = new Simbolo(id, valor, tipo ,false, linea, columna);
      }
    }
  }

  // establecer el arreglo
  public establecerArreglo(arreglo: Simbolo[][]) {
    this.valor = arreglo;
  }
}