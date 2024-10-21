import { Entorno } from "../../Entorno/Entorno";
import { Basico } from "../Basico";
import { Expresion } from "../Expresion";
import { Resultado, TipoDato } from "../Tipos";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

// ToCharArray

export class ToCharArray extends Expresion {

  private expresion: Expresion;

  constructor(expresion: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.expresion = expresion;
  }

  public calcular(entorno: Entorno): Resultado {
    const r = this.expresion.calcular(entorno);

    if (r.tipoDato != TipoDato.STRING) {
      //throw new Error(`Semantico: No se puede aplicar la función ToCharArray a un valor de tipo ${r.tipoDato}`);
      throw agregarError(new Error_(`No se puede aplicar la función ToCharArray a un valor de tipo ${r.tipoDato}`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    const vector : Expresion[] = [];
    const palabra = <String>r.valor;
    for ( let i=0; i<palabra.length; i++){
      vector.push(new Basico(r.valor[i], TipoDato.CHAR, this.linea, this.columna));
    }

    return { valor: vector, tipoDato: TipoDato.CHAR };

  }



  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let toCharArrayNode = `n${counter.get()}`;
    let toCharArrayLabelNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${toCharArrayNode}[label="ToCharArray"];\n`;
    result += `${toCharArrayLabelNode}[label="toCharArray"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="Expresion"];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${toCharArrayNode};\n`;
    result += `${toCharArrayNode} -> ${toCharArrayLabelNode};\n`;
    result += `${toCharArrayNode} -> ${lParenNode};\n`;
    result += `${toCharArrayNode} -> ${expNode};\n`;
    result += this.expresion.getAST(expNode);
    result += `${toCharArrayNode} -> ${rParenNode};\n`;

    return result;
}

}