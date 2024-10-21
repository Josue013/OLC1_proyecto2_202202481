import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";
import { Instruccion } from "./Instruccion";
import { Error_, TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Declaracion extends Instruccion {
  private tipoDato: string;
  private ids: string[];
  private exp: Expresion | null;
  private esConstante: boolean;

  constructor(tipoDato: string, ids:  string[], exp: Expresion | null, esConstante: boolean, linea: number, columna: number) {
    super(linea, columna);
    this.tipoDato = tipoDato;
    // Asegurarse de que ids sea un array
    this.ids = ids;
    this.exp = exp;
    this.esConstante = esConstante;
  }

  public ejecutar(entorno: Entorno) {
    let tipo: TipoDato;
    let valorPredeterminado: any;

    // Definir el tipo dominante según el tipo de dato
    switch (this.tipoDato) {
      case "int":
        tipo = TipoDato.ENTERO;
        valorPredeterminado = 0;
        break;
      case "double":
        tipo = TipoDato.DECIMAL;
        valorPredeterminado = 0.00;
        break;
      case "bool":
        tipo = TipoDato.BOOLEANO;
        valorPredeterminado = true;
        break;
      case "char":
        tipo = TipoDato.CHAR;
        valorPredeterminado = '0';
        break;
      case "string":
        tipo = TipoDato.STRING;
        valorPredeterminado = "";
        break;
      default:
        throw agregarError(new Error_(`${this.tipoDato}, no se permite en la declaración de variables`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Si existe una expresión, calcular su valor
    if (this.exp != null) {

      const valor = this.exp.calcular(entorno);

      // Validar que el tipo de la expresión coincida con el tipo dominante
      if (tipo != valor.tipoDato) {
        //throw new Error(`Tipo ${valor.tipoDato} no asignable a ${tipo}`);
        throw agregarError(new Error_(`Tipo ${valor.tipoDato} no asignable a ${tipo}`, this.linea, this.columna, TipoError.SEMANTICO));
      }
      // Guardar cada variable con el valor de la expresión
      this.ids.forEach(id => {
        entorno.guardarVariable(id, valor, tipo, this.esConstante, this.linea, this.columna);
      });
    } else {
      // Guardar cada variable con el valor predeterminado
      this.ids.forEach(id => {
        entorno.guardarVariable(id, { valor: valorPredeterminado, tipoDato: tipo }, tipo, this.esConstante, this.linea, this.columna);
      });
    }
  }

  /* LET ID : TIPO ( | = EXPRESSION) */

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let declarationNode = `n${counter.get()}`;
    let letNode = `n${counter.get()}`;
    let typeNode = `n${counter.get()}`;

    result += `${declarationNode}[label="Declaración"];\n`;
    result += `${letNode}[label="LET"];\n`;
    result += `${typeNode}[label="${this.tipoDato}"];\n`;

    result += `${last} -> ${declarationNode};\n`;
    result += `${declarationNode} -> ${letNode};\n`;

    for (let i = 0; i < this.ids.length; i++) {
      let idNode = `n${counter.get()}`;
      result += `${idNode}[label="${this.ids[i]}"];\n`;
      result += `${declarationNode} -> ${idNode};\n`;

      if (i < this.ids.length - 1) {
        let commaNode = `n${counter.get()}`;
        result += `${commaNode}[label=","];\n`;
        result += `${declarationNode} -> ${commaNode};\n`;
      }
    }

    let colonNode = `n${counter.get()}`;
    result += `${colonNode}[label=":"];\n`;
    result += `${declarationNode} -> ${colonNode};\n`;
    result += `${declarationNode} -> ${typeNode};\n`;

    if (this.exp != null) {
      let equalNode = `n${counter.get()}`;
      let expNode = `n${counter.get()}`;
      result += `${equalNode}[label="="];\n`;
      result += `${expNode}[label="Expresion"];\n`;
      result += `${declarationNode} -> ${equalNode};\n`;
      result += `${declarationNode} -> ${expNode};\n`;
      result += this.exp.getAST(expNode);
    }

    let semicolonNode = `n${counter.get()}`;
    result += `${semicolonNode}[label=";"];\n`;
    result += `${declarationNode} -> ${semicolonNode};\n`;

    return result;
  }

}