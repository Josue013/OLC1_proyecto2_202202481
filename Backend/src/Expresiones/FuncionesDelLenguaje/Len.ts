import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";


export class Len extends Expresion {
  private expresion: Expresion;

  constructor(expresion: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.expresion = expresion;
  }

  public calcular(entorno: Entorno): Resultado {
    const r = this.expresion.calcular(entorno);

    if (r.tipoDato == TipoDato.ID) {
      const vector = entorno.obtenerArreglo(r.valor);
      if (vector) {
        return { valor: vector.valor.length, tipoDato: TipoDato.ENTERO };
      } else {
        //throw new Error(`No se puede aplicar la función length a un valor de tipo ${r.tipoDato}`);
        throw agregarError(new Error_(`No se puede aplicar la función length a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
      }
    } else if (r.tipoDato == TipoDato.STRING) {
      return { valor: r.valor.length, tipoDato: TipoDato.ENTERO };
    } else {
      //throw new Error(`Expresión no válida para comando length`);
      throw agregarError(new Error_(`Expresión no válida para comando length`, this.linea, this.columna, TipoError.SEMANTICO));
    }
  }


  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let lenNode = `n${counter.get()}`;
    let lenLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${lenNode}[label="Len"];\n`;
    result += `${lenLabelNode}[label="len"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${lenNode};\n`;
    result += `${lenNode} -> ${lenLabelNode};\n`;
    result += `${lenNode} -> ${lParenNode};\n`;
    result += `${lenNode} -> ${expNode};\n`;
    result += this.expresion.getAST(expNode);
    result += `${lenNode} -> ${rParenNode};\n`;

    return result;
}

}