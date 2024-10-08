import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";

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
          throw new Error(`Tipo ${expResultado.tipoDato} no casteable a char`);
        }
        break;
      case "string":
        if (expResultado.tipoDato == TipoDato.ENTERO || expResultado.tipoDato == TipoDato.DECIMAL) {
          resultado = { valor: expResultado.valor.toString(), tipoDato: TipoDato.STRING };
        } else {
          throw new Error(`Tipo ${expResultado.tipoDato} no casteable a string`);
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
            throw new Error(`Tipo ${expResultado.tipoDato} no casteable a int`);
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
              throw new Error(`Tipo ${expResultado.tipoDato} no casteable a double`);
          }
          break;
      default:
        throw new Error(`Opción casteable no valida ${this.tipo}`);
    }
    return resultado;
  }
}