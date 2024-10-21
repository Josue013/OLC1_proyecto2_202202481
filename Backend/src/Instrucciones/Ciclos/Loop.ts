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

export class Loop extends Instruccion {

  constructor(private instrucciones: Bloque, linea: number, columna: number) {
    super(linea, columna);
  }

  public ejecutar(entorno: Entorno): any {
    while (true) { // Bucle infinito
      const transfer: any = this.instrucciones.ejecutar(entorno); // Ejecutar las instrucciones

      if (transfer != null || transfer != undefined) {
        if (transfer instanceof Break) {
          break; // Salir del bucle si se encuentra un break
        } else if (transfer.typeValue == 'return') {
          return transfer;
        } else if (transfer instanceof Continue) {
          continue; // Continuar con la siguiente iteración si se encuentra un continue
        } else {
          //throw new Error("Error en Loop");
          throw agregarError(new Error_("Error en Loop", this.linea, this.columna, TipoError.SEMANTICO));
        }
      }
    }
  }

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let loopNodeT = `n${counter.get()}`;
    let loopNode = `n${counter.get()}`;
    let blockNode = `n${counter.get()}`;

    result += `${loopNodeT}[label="I_Loop"];\n`;
    result += `${loopNode}[label="loop"];\n`;
    result += `${blockNode}[label="Block"];\n`;

    result += `${last} -> ${loopNodeT};\n`;
    result += `${loopNodeT} -> ${loopNode};\n`;
    result += `${loopNodeT} -> ${blockNode};\n`;
    result += this.instrucciones.getAST(blockNode);

    return result;
  }

}