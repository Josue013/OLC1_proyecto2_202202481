import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class ToString extends Expresion {
  private exp: Expresion;

  constructor(exp: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.exp = exp;
  }

  public calcular(entorno: Entorno): Resultado {
    const r = this.exp.calcular(entorno);
    if (r.tipoDato != TipoDato.ENTERO && r.tipoDato != TipoDato.DECIMAL && r.tipoDato != TipoDato.BOOLEANO) {
      //throw new Error(`Semantico: No se puede aplicar la función ToString a un valor de tipo ${r.tipoDato}`);
      throw agregarError(new Error_(`No se puede aplicar la función ToString a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
    } else {
      return { valor: r.valor.toString(), tipoDato: TipoDato.STRING };
    }
  }


  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let toStringNode = `n${counter.get()}`;
    let toStringLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${toStringNode}[label="ToString"];\n`;
    result += `${toStringLabelNode}[label="toString"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${toStringNode};\n`;
    result += `${toStringNode} -> ${toStringLabelNode};\n`;
    result += `${toStringNode} -> ${lParenNode};\n`;
    result += `${toStringNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${toStringNode} -> ${rParenNode};\n`;

    return result;
}

}