import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";

export class Vector2 extends Instruccion {
  public id: string[];                                     // Identificadores del vector
  public tipo: string;                                     // Tipo de dato del vector
  public valor: Expresion | Expresion[] | Expresion[][];   // Valor del vector
  public bandera: boolean;                                 // Bandera para verificar si el vector es unidimensional o bidimensional

  constructor(id: string[], tipo: string, valor: Expresion | Expresion[] | Expresion[][], line: number, column: number, bandera: boolean) {
    super(line, column);
    this.id = id;
    this.tipo = tipo;
    this.valor = valor;
    this.bandera = bandera;
  }

  public ejecutar(entorno: Entorno): any {
    let tipoDominante: TipoDato;
    let valorPredeterminado: any;

    // Definir el tipo dominante según el tipo de dato
    switch (this.tipo) {
      case "int":
        tipoDominante = TipoDato.ENTERO;
        valorPredeterminado = 0;
        break;
      case "double":
        tipoDominante = TipoDato.DECIMAL;
        valorPredeterminado = 0.0;
        break;
      case "bool":
        tipoDominante = TipoDato.BOOLEANO;
        valorPredeterminado = true;
        break;
      case "char":
        tipoDominante = TipoDato.CHAR;
        valorPredeterminado = '0';
        break;
      case "string":
        tipoDominante = TipoDato.STRING;
        valorPredeterminado = "";
        break;
      default:
        //throw new Error(`Tipo ${this.tipo} no permitido para la declaración de vectores`);
        throw agregarError(new Error_(`Tipo ${this.tipo} no permitido para la declaración de vectores`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Guardar el vector en el entorno
    if (this.bandera && !(this.valor instanceof Expresion)) {
      // caso para vectores unidimensionales
      if (!(this.valor[0] instanceof Array)) {
        const maxColumnas = 1;
        const maxFilas = this.valor.length;

        // Guardar el vector en el entorno
        entorno.guardarArreglo(this.id[0], tipoDominante, maxFilas, maxColumnas, this.linea, this.columna); 
        
        // Inicializar con valores predeterminados
        entorno.obtenerArreglo(this.id[0])?.inicializarValoresPredeterminados(this.id[0], tipoDominante, valorPredeterminado, this.linea, this.columna); 

        // Asignar valores al vector
        for (let i = 0; i < this.valor.length; i++) {
          const expresion = <Expresion>this.valor[i];
          const valor = expresion.calcular(entorno);

          if (valor.tipoDato == tipoDominante) {
            entorno.obtenerArreglo(this.id[0])?.asignarValor(i, 0, this.id[0], tipoDominante, valor.valor, this.linea, this.columna);
          } else {
            //throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
            throw agregarError(new Error_(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`, this.linea, this.columna, TipoError.SEMANTICO));
          }
        }
      } else {
        //throw new Error(`El vector ${this.id} no puede ser de dos dimensiones`);
        throw agregarError(new Error_(`El vector ${this.id} no puede ser de dos dimensiones`, this.linea, this.columna, TipoError.SEMANTICO));
      }
    } else if (!(this.valor instanceof Expresion)) {
      // Caso para vectores bidimensionales
      if (this.valor[0] instanceof Array) {
        const maxFilas = this.valor.length;
        const maxColumnas = Math.max(...this.valor.map(columnas => columnas instanceof Array ? columnas.length : 0));

        // Guardar el vector en el entorno
        entorno.guardarArreglo(this.id[0], tipoDominante, maxFilas, maxColumnas, this.linea, this.columna);

        // Inicializar con valores predeterminados
        entorno.obtenerArreglo(this.id[0])?.inicializarValoresPredeterminados(this.id[0], tipoDominante, valorPredeterminado, this.linea, this.columna); 

        // Asignar valores al vector
        for (let i = 0; i < this.valor.length; i++) {
          const columnas = <Expresion[]>this.valor[i];
          for (let j = 0; j < columnas.length; j++) {
            const expresion = columnas[j];
            const valor = expresion.calcular(entorno);

            if (valor.tipoDato == tipoDominante) {
              entorno.obtenerArreglo(this.id[0])?.asignarValor(i, j, this.id[0], tipoDominante, valor.valor, this.linea, this.columna);
            } else {
              //throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
              throw agregarError(new Error_(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`, this.linea, this.columna, TipoError.SEMANTICO));
            }
          }
        }
      }
    } else {
      // Caso para expresiones
      const expresion = this.valor.calcular(entorno);
      const aux = expresion.valor;

      // Guardar el vector en el entorno
      entorno.guardarArreglo(this.id[0], tipoDominante, aux.length, 1, this.linea, this.columna); 
      
      // Asignar valores al vector
      for (let i = 0; i < aux.length; i++) {
        const valor = aux[i].calcular(entorno);
        if (valor.tipoDato == tipoDominante) {
          entorno.obtenerArreglo(this.id[0])?.asignarValor(i, 0, this.id[0], tipoDominante, valor.valor, this.linea, this.columna); 
        } else {
          //throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
          throw agregarError(new Error_(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`, this.linea, this.columna, TipoError.SEMANTICO));
        }
      }
    }
  }


  /* LET ID : TIPO ([] | [][]) = LISTAVALORES */

  public getAST(anterior: string): string {
      return "";
  }

}