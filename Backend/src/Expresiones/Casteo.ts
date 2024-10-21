import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Casteo extends Expresion {
  private tipo: string;
  private exp: Expresion;

  constructor(tipo: string, exp: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.tipo = tipo;
    this.exp = exp;
  }

  public calcular(entorno: Entorno): Resultado {

    const expResultado: Resultado = this.exp.calcular(entorno);
    let resultado: Resultado;

    switch (this.tipo) {
      case "char":
        if (expResultado.tipoDato == TipoDato.ENTERO) {
          resultado = { valor: String.fromCharCode(expResultado.valor), tipoDato: TipoDato.CHAR };
        } else {
          throw agregarError(new Error_(`Tipo ${expResultado.tipoDato} no casteable a char`, this.linea, this.columna, TipoError.SEMANTICO));
        }
        break;
      case "string":
        if (expResultado.tipoDato == TipoDato.ENTERO || expResultado.tipoDato == TipoDato.DECIMAL) {
          resultado = { valor: expResultado.valor.toString(), tipoDato: TipoDato.STRING };
        } else {
          //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a string`);
          throw agregarError(new Error_(`Tipo ${expResultado.tipoDato} no casteable a string`, this.linea, this.columna, TipoError.SEMANTICO));
        }
        break;
      case "int":
        switch (expResultado.tipoDato) {
          case TipoDato.ENTERO:
            resultado = { valor: expResultado.valor, tipoDato: TipoDato.ENTERO };
            break;
          case TipoDato.DECIMAL:
            resultado = { valor: Math.floor(expResultado.valor), tipoDato: TipoDato.ENTERO };
            break;
          case TipoDato.CHAR:
            resultado = { valor: expResultado.valor.charCodeAt(0), tipoDato: TipoDato.ENTERO };
            break;
          default:
            //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a int`);
            throw agregarError(new Error_(`Tipo ${expResultado.tipoDato} no casteable a int`, this.linea, this.columna, TipoError.SEMANTICO));
        }
        break;
        case "double":
          switch (expResultado.tipoDato) {
            case TipoDato.ENTERO:
              // Redondear a 4 decimales
              resultado = { valor: parseFloat(expResultado.valor).toFixed(4), tipoDato: TipoDato.DECIMAL };
              break;
            case TipoDato.DECIMAL:
              // Redondear a 4 decimales
              resultado = { valor: expResultado.valor.toFixed(4), tipoDato: TipoDato.DECIMAL };
              break;
            case TipoDato.CHAR:
              // Redondear a 4 decimales
              resultado = { valor: expResultado.valor.charCodeAt(0).toFixed(4), tipoDato: TipoDato.DECIMAL };
              break;
            default:
              //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a double`);
              throw agregarError(new Error_(`Tipo ${expResultado.tipoDato} no casteable a double`, this.linea, this.columna, TipoError.SEMANTICO));
          }
          break;
      default:
        //throw new Error(`Opción casteable no valida ${this.tipo}`);
        throw agregarError(new Error_(`Opción casteable no valida ${this.tipo}`, this.linea, this.columna, TipoError.SEMANTICO));
    }
    return resultado;
  }

  /* CAST ( EXPRESION AS TIPO) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let castNode = `n${counter.get()}`;
    let castLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let asNode = `n${counter.get()}`;
    let typeNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${castNode}[label="Casteo"];\n`;
    result += `${castLabelNode}[label="CAST"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${asNode}[label="AS"];\n`;
    result += `${typeNode}[label="${this.tipo}"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${castNode};\n`;
    result += `${castNode} -> ${castLabelNode};\n`;
    result += `${castNode} -> ${lParenNode};\n`;
    result += `${castNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${castNode} -> ${asNode};\n`;
    result += `${castNode} -> ${typeNode};\n`;
    result += `${castNode} -> ${rParenNode};\n`;

    return result;
  }

}