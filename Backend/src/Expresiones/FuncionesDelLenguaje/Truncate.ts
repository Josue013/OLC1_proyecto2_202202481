import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class Truncate extends Expresion {

  constructor(private exp: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.exp = exp;
  }

  public calcular(entorno: Entorno): Resultado {
    const r = this.exp.calcular(entorno);

    if (r.tipoDato == TipoDato.DECIMAL || r.tipoDato == TipoDato.ENTERO) {
      return { valor: Math.trunc(parseFloat(r.valor)), tipoDato: TipoDato.ENTERO };
    } else {
      //throw new Error(`Semantico: No se puede aplicar la función Truncate a un valor de tipo ${r.tipoDato}`);
      throw agregarError(new Error_(`No se puede aplicar la función Truncate a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
    }

  }

  /* TRUNCATE ( EXPRESION ) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let truncateNode = `n${counter.get()}`;
    let truncateLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${truncateNode}[label="Truncate"];\n`;
    result += `${truncateLabelNode}[label="TRUNCATE"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${truncateNode};\n`;
    result += `${truncateNode} -> ${truncateLabelNode};\n`;
    result += `${truncateNode} -> ${lParenNode};\n`;
    result += `${truncateNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${truncateNode} -> ${rParenNode};\n`;

    return result;
}

}