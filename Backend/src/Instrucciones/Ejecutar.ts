import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Llamada } from "./Llamada";
import Contador from "../Entorno/Contador";

export class Ejecutar extends Instruccion {

  public funcion: Llamada;

  constructor(funcion: Llamada, line: number, column: number) {
    super(line, column);
    this.funcion = funcion;
    
  }

  public ejecutar(entorno: Entorno) {

    // Verificar si la función existe en el entorno
    if(entorno.obtenerFuncion(this.funcion.id) == null) {
      throw new Error(`La función ${this.funcion.id} no existe`);
    } else {
      const r = this.funcion.ejecutar(entorno);
      if (r != null) {
        return { valor: r.valor, tipoDato: r.tipoDato };
      }else {
        return { valor: null, tipoDato: TipoDato.NULO };
      }
    }

  }

  /* EJECUTAR ID (  | PARAMETORS) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let ejecutarNode = `n${counter.get()}`;
    let idNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;

    result += `${ejecutarNode}[label="EJECUTAR"];\n`;
    result += `${idNode}[label="${this.funcion.id}"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${rParenNode}[label=")"];\n`;

    result += `${anterior} -> ${ejecutarNode};\n`;
    result += `${ejecutarNode} -> ${idNode};\n`;
    result += `${ejecutarNode} -> ${lParenNode};\n`;

    if (this.funcion.parametros.length != 0) {
      for (let i = 0; i < this.funcion.parametros.length; i++) {
        let paramNode = `n${counter.get()}`;
        result += `${paramNode}[label="param"];\n`;
        result += `${ejecutarNode} -> ${paramNode};\n`;
        result += this.funcion.parametros[i].exp.getAST(paramNode);

        if (i < this.funcion.parametros.length - 1) {
          let commaNode = `n${counter.get()}`;
          result += `${commaNode}[label=","];\n`;
          result += `${ejecutarNode} -> ${commaNode};\n`;
        }
      }
    }

    result += `${ejecutarNode} -> ${rParenNode};\n`;

    return result;
  }

}