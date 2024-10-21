import { Resultado, TipoDato } from "../../Expresiones/Tipos";
import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Bloque } from "../Bloque";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Return } from "../Return";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class CWhile extends Instruccion {

  constructor(private condicion: Expresion, private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno) {
    let cond = this.condicion.calcular(entorno);
    
    // Verificar que la condición sea de tipo booleano
    if (cond.tipoDato != TipoDato.BOOLEANO) {
      //throw new Error("La condición no es booleana");
      throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));
    }

    while (cond.valor === true) {
      const transfer: any = this.instrucciones.ejecutar(entorno); // Declarar transfer como any
      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break;
        } else if (transfer instanceof Continue) {
          cond = this.condicion.calcular(entorno); // Recalcular la condición después de continue
          continue;
        } else if (transfer.typeValue == 'return') {
          return transfer;
        } else {
          //throw new Error("Error en While");
          throw agregarError(new Error_("Error en While", this.linea, this.columna, TipoError.SEMANTICO));
        }
      }
      cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración

      // Verificar que la condición siga siendo de tipo booleano después de cada iteración
      if (cond.tipoDato != TipoDato.BOOLEANO) {
        //throw new Error("La condición no es booleana");
        throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));
      }
    }
  }

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let whileNodeT = `n${counter.get()}`;
    let whileNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expressionNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let blockNode = `n${counter.get()}`;

    result += `${whileNodeT}[label="I_While"];\n`;
    result += `${whileNode}[label="While"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expressionNode}[label="Expression"];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${blockNode}[label="Block"];\n`;

    result += `${last} -> ${whileNodeT};\n`;
    result += `${whileNodeT} -> ${whileNode};\n`;
    result += `${whileNode} -> ${lParenNode};\n`;
    result += `${whileNode} -> ${expressionNode};\n`;
    result += this.condicion.getAST(expressionNode);
    result += `${whileNode} -> ${rParenNode};\n`;
    result += `${whileNode} -> ${blockNode};\n`;
    result += this.instrucciones.getAST(blockNode);

    return result;
  }

}