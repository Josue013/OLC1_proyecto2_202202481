import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Entorno } from "../../Entorno/Entorno";
import Contador from "../../Entorno/Contador";

export class Case extends Instruccion {
  cond: Expresion;
  ins: Instruccion[];

  constructor(cond: Expresion, ins: Instruccion[], line: number, column: number) {
    super(line, column);
    this.cond = cond;
    this.ins = ins;
  }

  public ejecutar(entorno: Entorno): any {
      for (const instruccion of this.ins) {
        try {
          const cs = instruccion.ejecutar(entorno);
          if (cs != null || cs != undefined) {
            return cs;
          }
        } catch (error) {
          console.log(error);
        }
        
      }
  }

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let caseNodeT = `n${counter.get()}`;
    let caseNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let colonNode = `n${counter.get()}`;
    let instructionsNode = `n${counter.get()}`;

    result += `${caseNodeT}[label="I_case"];\n`;
    result += `${caseNode}[label="case"];\n`;
    result += `${expNode}[label="exp"];\n`;
    result += `${colonNode}[label=":"];\n`;
    result += `${instructionsNode}[label="instructions"];\n`;

    result += `${anterior} -> ${caseNodeT};\n`;
    result += `${caseNodeT} -> ${caseNode};\n`;
    result += `${caseNodeT} -> ${expNode};\n`;
    result += this.cond.getAST(expNode);
    result += `${caseNodeT} -> ${colonNode};\n`;
    result += `${caseNodeT} -> ${instructionsNode};\n`;

    for (const instruction of this.ins) {
      result += instruction.getAST(instructionsNode);
    }

    return result;
  }

}