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

export class DoUntil extends Instruccion {
  
  constructor(private instrucciones: Bloque, private condicion: Expresion, linea: number, columna: number) {
    super(linea, columna);
  }
  
  public ejecutar(entorno: Entorno) {
    
    let cond = this.condicion.calcular(entorno);

    if (cond.tipoDato != TipoDato.BOOLEANO) {
      throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));
    }

    do {
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
          throw agregarError(new Error_("Error en DoUntil", this.linea, this.columna, TipoError.SEMANTICO));
        }
      }

      cond = this.condicion.calcular(entorno); // Recalcular la condición después de cada iteración

      // Verificar que la condición siga siendo de tipo booleano después de cada iteración
      if (cond.tipoDato != TipoDato.BOOLEANO) {
        //throw new Error("La condición no es booleana");
        throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));
      }

    } while (cond.valor === false);

  }

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let doNodeT = `n${counter.get()}`;
    let doNode = `n${counter.get()}`;
    let blockNode = `n${counter.get()}`;
    let untilNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expressionNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let semicolonNode = `n${counter.get()}`;
  
    result += `${doNodeT}[label="I_DoUntil"];\n`;
    result += `${doNode}[label="do"];\n`;
    result += `${blockNode}[label="block"];\n`;
    result += `${untilNode}[label="until"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expressionNode}[label="expression"];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${semicolonNode}[label=";"];\n`;
    result += `${anterior} -> ${doNodeT};\n`;
    result += `${doNodeT} -> ${doNode};\n`;
    result += `${doNodeT} -> ${blockNode};\n`;
    result += this.instrucciones.getAST(blockNode);
    result += `${doNodeT} -> ${untilNode};\n`;
    result += `${doNodeT} -> ${lParenNode};\n`;
    result += `${doNodeT} -> ${expressionNode};\n`;
    result += this.condicion.getAST(expressionNode);
    result += `${doNodeT} -> ${rParenNode};\n`;
    result += `${doNodeT} -> ${semicolonNode};\n`;
    return result;
    }

}
