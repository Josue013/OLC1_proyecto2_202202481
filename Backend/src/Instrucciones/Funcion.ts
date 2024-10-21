import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { agregarError } from "../AST/AST";
import { TipoError } from "../Error/Errores_";
import { Error_ } from "../Error/Errores_";
import Contador from "../Entorno/Contador";

export class Funcion extends Instruccion {

  public tipo: string; // Tipo de dato de retorno de la función
  public tipoDato: TipoDato; // Tipo de dato de retorno de la función
  public id: string; // Identificador de la función
  public parametros: { tipo: string, id: string , exp: Expresion | null, vector: boolean, simple: boolean}[]; // Lista de parámetros de la función
  public instrucciones: Bloque; // Instrucciones de la función

  constructor(tipo: string, id: string, parametros: { tipo: string, id: string , exp: Expresion | null, vector: boolean, simple: boolean}[], instrucciones: Bloque, line: number, column: number) {
    super(line, column);
    this.tipo = tipo;
    this.id = id;
    this.parametros = parametros;
    this.instrucciones = instrucciones;
    this.tipoDato = TipoDato.NULO;
  }

  public ejecutar(entorno: Entorno) : any {
    let tipoDominante: TipoDato;

    // Definir el tipo dominante según el tipo de dato
    switch (this.tipo) {
      case "int":
        tipoDominante = TipoDato.ENTERO; // Tipo de dato entero
        break;
      case "double":
        tipoDominante = TipoDato.DECIMAL; // Tipo de dato decimal
        break;
      case "bool":
        tipoDominante = TipoDato.BOOLEANO; // Tipo de dato booleano
        break;
      case "char":
        tipoDominante = TipoDato.CHAR; // Tipo de dato char
        break;
      case "string":
        tipoDominante = TipoDato.STRING; // Tipo de dato string
        break;
      case "void":
        tipoDominante = TipoDato.NULO; // Tipo de dato nulo cuando sea void
        break;
      default:
        //throw new Error(`Tipo ${this.tipo} no permitido para la declaración de funciones`);
      throw agregarError(new Error_(`Tipo ${this.tipo} no permitido para la declaración de funciones`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Guardar la función en el entorno
    this.tipoDato = tipoDominante;
    entorno.guardarFuncion(this.id, this);

    // Guardar los valores predeterminados de los parámetros en el entorno
    for (let parametro of this.parametros) {
      if (parametro.exp != null) {
        const valor = parametro.exp.calcular(entorno);
        entorno.guardarVariable(parametro.id, valor, valor.tipoDato, false, this.linea, this.columna);
      }
    }
  }

  /* Function TIPO ID ( PARAMETROS ) BLOQUE */

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let functionNode = `n${counter.get()}`;
    let typeNode = `n${counter.get()}`;
    let idNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let blockNode = `n${counter.get()}`;

    result += `${functionNode}[label="Declaración Function"];\n`;
    result += `${typeNode}[label="${this.tipo}"];\n`;
    result += `${idNode}[label="${this.id}"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${blockNode}[label="Block"];\n`;

    result += `${last} -> ${functionNode};\n`;
    result += `${functionNode} -> ${typeNode};\n`;
    result += `${functionNode} -> ${idNode};\n`;
    result += `${functionNode} -> ${lParenNode};\n`;

    if (this.parametros.length != 0) {
      for (let i = 0; i < this.parametros.length; i++) {
        let paramNode = `n${counter.get()}`;
        result += `${paramNode}[label="param"];\n`;
        result += `${functionNode} -> ${paramNode};\n`;

        let paramTypeNode = `n${counter.get()}`;
        let paramIdNode = `n${counter.get()}`;
        result += `${paramTypeNode}[label="${this.parametros[i].tipo}"];\n`;
        if (this.parametros[i].vector) {
          if (this.parametros[i].simple) {
            result += `${paramIdNode}[label="${this.parametros[i].id}[]"];\n`;
          } else {
            result += `${paramIdNode}[label="${this.parametros[i].id}[][]"];\n`;
          }
        } else {
          result += `${paramIdNode}[label="${this.parametros[i].id}"];\n`;
        }
        result += `${paramNode} -> ${paramTypeNode};\n`;
        result += `${paramNode} -> ${paramIdNode};\n`;

        if (i < this.parametros.length - 1) {
          let commaNode = `n${counter.get()}`;
          result += `${commaNode}[label=","];\n`;
          result += `${functionNode} -> ${commaNode};\n`;
        }
      }
    }

    result += `${functionNode} -> ${rParenNode};\n`;
    result += `${functionNode} -> ${blockNode};\n`;
    result += this.instrucciones.getAST(blockNode);

    return result;
  }

}