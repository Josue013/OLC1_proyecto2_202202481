import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "./Instruccion";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Return } from "./Return";
import Contador from "../Entorno/Contador";

export class Bloque extends Instruccion {

  instrucciones: Instruccion[]; 

  constructor( instrucciones: Instruccion[], linea: number, columna: number) {
    super(linea, columna);
    this.instrucciones = instrucciones
  }

  public ejecutar(entorno: Entorno): any {
    const newEnv = new Entorno(entorno);

    for (const instruccion of this.instrucciones) {
      try {
        const transfer = instruccion.ejecutar(newEnv);
        if (transfer != null  || transfer != undefined) {
          
          if (transfer instanceof Continue){
            continue;
          } 
          
          return transfer;
        }
      } catch (error) {
        console.log(error);
      }
    }
    return null;
  }

  public getAST(anterior: string): string {
    let ast = "";
    let counter = Contador.getInstancia();
    let lbracket = `n${counter.get()}`;
    let rbracket = `n${counter.get()}`;

    ast += `${lbracket}[label="{"];\n`;
    ast += `${anterior} -> ${lbracket};\n`;

    for (const instruction of this.instrucciones) {
      ast += instruction.getAST(lbracket);
    }

    ast += `${rbracket}[label="}"];\n`;
    ast += `${anterior} -> ${rbracket};\n`;

    return ast;
  }

}