import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Resultado, TipoDato } from "../Expresiones/Tipos";
import Contador from "../Entorno/Contador";

export class Return extends Instruccion {

  

  constructor(line: number, column: number, private valor: Expresion | null) {
    super(line, column);
  }

  public ejecutar(entorno: Entorno): any {
    if(this.valor != null){
      const value = this.valor.calcular(entorno);
      return {line: this.linea, column: this.columna, typeValue: "return", value: value.valor, type: value.tipoDato};
    } else{
      return {line: this.linea, column: this.columna, typeValue: "return", value: null, type: TipoDato.NULO};
    }
  }

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let returnNodeT = `n${counter.get()}`;
    let returnNode = `n${counter.get()}`;

    result += `${returnNodeT}[label="IntruccionReturn"];\n`;
    result += `${returnNode}[label="return"];\n`;
    result += `${last} -> ${returnNodeT};\n`;
    result += `${returnNodeT} -> ${returnNode};\n`;

    if (this.valor != null) {
      let expNode = `n${counter.get()}`;
      result += `${expNode}[label="Expresion"];\n`;
      result += `${returnNodeT} -> ${expNode};\n`;
      result += this.valor.getAST(expNode);
    }

    return result;
  }

}