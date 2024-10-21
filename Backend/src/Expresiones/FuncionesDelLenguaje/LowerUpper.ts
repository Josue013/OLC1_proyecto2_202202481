import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class LowerUpper extends Expresion {
  private exp: Expresion;
  private bandera: boolean;

  constructor(exp: Expresion, bandera: boolean, linea: number, columna: number) {
    super(linea, columna);
    this.exp = exp;
    this.bandera = bandera;
  }

  public calcular(entorno: Entorno): Resultado {
    const r = this.exp.calcular(entorno);
    if (r.tipoDato != TipoDato.STRING) {
      //throw new Error(`Semantico: No se puede aplicar la función Lower/Upper a un valor de tipo ${r.tipoDato}`);
      throw agregarError(new Error_(`No se puede aplicar la función Lower/Upper a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    if (this.bandera){
      return { valor: r.valor.toLowerCase(), tipoDato: TipoDato.STRING };
    } else {
      return { valor: r.valor.toUpperCase(), tipoDato: TipoDato.STRING };
    }

  }

  /* LOWER/UPPER ( EXPRESION ) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let lowerUpperNode = `n${counter.get()}`;
    let lowerUpperLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${lowerUpperNode}[label="${this.bandera ? "LOWER" : "UPPER"}"];\n`;
    result += `${lowerUpperLabelNode}[label="${this.bandera ? "lower" : "upper"}"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${lowerUpperNode};\n`;
    result += `${lowerUpperNode} -> ${lowerUpperLabelNode};\n`;
    result += `${lowerUpperNode} -> ${lParenNode};\n`;
    result += `${lowerUpperNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${lowerUpperNode} -> ${rParenNode};\n`;

    return result;
}

}
