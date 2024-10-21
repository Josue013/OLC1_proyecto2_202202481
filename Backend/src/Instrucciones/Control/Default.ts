import { Expresion } from "../../Expresiones/Expresion";
import { Instruccion } from "../Instruccion";
import { Entorno } from "../../Entorno/Entorno";
import { Break } from "../Break";
import { Return } from "../Return";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class Default extends Instruccion {
  ins: Instruccion[];

  constructor(ins: Instruccion[], line: number, column: number) {
    super(line, column);
    this.ins = ins;
  }

  public ejecutar(entorno: Entorno): any {
    for (const instruccion of this.ins) {
      try {
        const cs = instruccion.ejecutar(entorno);
        if (cs != null || cs != undefined) {
          if (cs instanceof Break){
            break;
          } 
          else if(cs.typeValue == 'return'){
            return cs;
          }
          else {
            //throw new Error("Error en Case");
            throw agregarError(new Error_("Error en Case",this.linea, this.columna, TipoError.SEMANTICO));
          }
        }
      } catch (error) {
        console.log(error);

      }
    }
  }


  public getAST(anterior: string): string {
    let ast = "";
    let counter = Contador.getInstancia();
    let defaultNodeT = `n${counter.get()}`;
    let defaultNode = `n${counter.get()}`;
    let colonNode = `n${counter.get()}`;
    let instructionsNode = `n${counter.get()}`;

    ast += `${defaultNodeT}[label="I_default"];\n`;
    ast += `${defaultNode}[label="default"];\n`;
    ast += `${colonNode}[label=":"];\n`;
    ast += `${instructionsNode}[label="instructions"];\n`;

    ast += `${anterior} -> ${defaultNodeT};\n`;
    ast += `${defaultNodeT} -> ${defaultNode};\n`;
    ast += `${defaultNodeT} -> ${colonNode};\n`;
    ast += `${defaultNodeT} -> ${instructionsNode};\n`;

    for (const instruction of this.ins) {
      ast += instruction.getAST(instructionsNode);
    }

    return ast;
  }

}
