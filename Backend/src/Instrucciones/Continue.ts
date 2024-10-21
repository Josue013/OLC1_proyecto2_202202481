import Contador from "../Entorno/Contador";
import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "./Instruccion";

export class Continue extends Instruccion{
  constructor(line:number, column:number){
      super(line,column)
  }
  public ejecutar(entorno: Entorno) {
      return this
  }

  public getAST(anterior: string): string {
    let result = ""
    let counter = Contador.getInstancia()
    let breakNodeT = `n${counter.get()}`
    let breakNode = `n${counter.get()}`
    let semicolonNode = `n${counter.get()}`
    result += `${breakNodeT}[label="InstruccionContinue"];\n`
    result += `${breakNode}[label="continue"];\n`
    result += `${breakNodeT} -> ${breakNode};\n`
    result += `${breakNodeT} -> ${semicolonNode};\n`
    return result
  }

}