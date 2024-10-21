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

export class For extends Instruccion {

  constructor (private Declaracion: Instruccion, private cond: Expresion, private incremento: Instruccion, private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno): any {
    const nuevoEntorno = new Entorno(entorno);
    this.Declaracion.ejecutar(nuevoEntorno);
    let cond = this.cond.calcular(nuevoEntorno);

    // Verificar que la condición sea de tipo booleano
    if (cond.tipoDato !== TipoDato.BOOLEANO) {
      throw agregarError(new Error_("La condición del bucle for debe ser de tipo booleano", this.linea, this.columna, TipoError.SEMANTICO));

    }

    while (cond.valor === true) {
      const transfer = this.instrucciones.ejecutar(nuevoEntorno); // Declarar transfer como any
      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break;
        } else if (transfer instanceof Continue) {
          this.incremento.ejecutar(nuevoEntorno);
          cond = this.cond.calcular(nuevoEntorno);
          continue;
        } else if (transfer.typeValue == 'return') {
          return transfer;
        } else {
          //throw new Error("Error en For");
          throw agregarError(new Error_("Error en For", this.linea, this.columna, TipoError.SEMANTICO));
        }
      }
      this.incremento.ejecutar(nuevoEntorno);
      cond = this.cond.calcular(nuevoEntorno);

      // Verificar que la condición siga siendo de tipo booleano después del incremento
      if (cond.tipoDato !== TipoDato.BOOLEANO) {
        //throw new Error("La condición del bucle for debe ser de tipo booleano");
        throw agregarError(new Error_("La condición del bucle for debe ser de tipo booleano", this.linea, this.columna, TipoError.SEMANTICO));
      }
    }
  }

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let forNodeT = `n${counter.get()}`;
    let forNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let instructionNode = `n${counter.get()}`;
    let semicolonNode1 = `n${counter.get()}`;
    let expressionNode = `n${counter.get()}`;
    let semicolonNode2 = `n${counter.get()}`;
    let instructionNode2 = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let blockNode = `n${counter.get()}`;

    result += `${forNodeT}[label="I_For"];\n`;
    result += `${forNode}[label="for"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${instructionNode}[label="Instruction"];\n`;
    result += `${semicolonNode1}[label=";"];\n`;
    result += `${expressionNode}[label="Expression"];\n`;
    result += `${semicolonNode2}[label=";"];\n`;
    result += `${instructionNode2}[label="Instruction"];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${blockNode}[label="Block"];\n`;
    result += `${last} -> ${forNodeT};\n`;
    result += `${forNodeT} -> ${forNode};\n`;
    result += `${forNodeT} -> ${lParenNode};\n`;
    result += `${forNodeT} -> ${instructionNode};\n`;
    result += this.Declaracion.getAST(instructionNode);
    result += `${forNodeT} -> ${semicolonNode1};\n`;
    result += `${forNodeT} -> ${expressionNode};\n`;
    result += this.cond.getAST(expressionNode);
    result += `${forNodeT} -> ${semicolonNode2};\n`;
    result += `${forNodeT} -> ${instructionNode2};\n`;
    result += this.incremento.getAST(instructionNode2);
    result += `${forNodeT} -> ${rParenNode};\n`;
    result += `${forNodeT} -> ${blockNode};\n`;
    result += this.instrucciones.getAST(blockNode);
    return result;
  }

}