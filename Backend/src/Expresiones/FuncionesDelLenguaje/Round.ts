import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class Round extends Expresion {
  private exp: Expresion;

  constructor(exp: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.exp = exp;
  }

  public calcular(entorno: Entorno): Resultado {
      const r = this.exp.calcular(entorno);
      if (r.tipoDato == TipoDato.DECIMAL || r.tipoDato == TipoDato.ENTERO) {
        return { valor: Math.round(parseFloat(r.valor)), tipoDato: TipoDato.ENTERO };
      } else {
        //throw new Error(`Semantico: No se puede aplicar la función Round a un valor de tipo ${r.tipoDato}`);
        throw agregarError(new Error_(`No se puede aplicar la función Round a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
      }
  }


  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let roundNode = `n${counter.get()}`;
    let roundLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${roundNode}[label="Round"];\n`;
    result += `${roundLabelNode}[label="round"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${roundNode};\n`;
    result += `${roundNode} -> ${roundLabelNode};\n`;
    result += `${roundNode} -> ${lParenNode};\n`;
    result += `${roundNode} -> ${expNode};\n`;
    result += this.exp.getAST(expNode);
    result += `${roundNode} -> ${rParenNode};\n`;

    return result;
}
  
}
