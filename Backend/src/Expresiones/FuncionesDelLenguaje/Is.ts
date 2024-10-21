import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class Is extends Expresion {

  private exp: Expresion;
  private tipo: string;

  constructor(exp: Expresion, tipo: string, linea: number, columna: number) {
    super(linea, columna);
    this.exp = exp;
    this.tipo = tipo;
  }

  public calcular(entorno: Entorno): Resultado {
    const valorExp = this.exp.calcular(entorno);
    let tipoEvaluado: TipoDato;

    switch (this.tipo.toLowerCase()) {
      case "int":
        tipoEvaluado = TipoDato.ENTERO;
        break;
      case "double":
        tipoEvaluado = TipoDato.DECIMAL;
        break;
      case "bool":
        tipoEvaluado = TipoDato.BOOLEANO;
        break;
      case "char":
        tipoEvaluado = TipoDato.CHAR;
        break;
      case "string":
        tipoEvaluado = TipoDato.STRING;
        break;
      default:
        throw agregarError(new Error_(`Tipo ${this.tipo} no reconocido`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    const resultado: Resultado = {
      valor: valorExp.tipoDato === tipoEvaluado,
      tipoDato: TipoDato.BOOLEANO
    };

    return resultado;
  }

  /* EXPRESION IS TIPO */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let isNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let isLabelNode = `n${counter.get()}`;
    let tipoNode = `n${counter.get()}`;

    result += `${isNode}[label="Is"];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${isLabelNode}[label="is"];\n`;
    result += `${tipoNode}[label="${this.tipo}"];\n`;

    result += `${anterior} -> ${isNode};\n`;
    result += `${isNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${isNode} -> ${isLabelNode};\n`;
    result += `${isNode} -> ${tipoNode};\n`;

    return result;
}

}