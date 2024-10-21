import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Incremento_Decremento extends Instruccion {
  private id: string;
  private signo: string;

  constructor(id: string, signo: string, linea: number, columna: number) {
    super(linea, columna);
    this.id = id;
    this.signo = signo;
  }

  public ejecutar(entorno: Entorno) {
    const simbolo = entorno.obtenerVariable(this.id);
    if (simbolo) {
      if (simbolo.esConstante) {
        //throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
        throw agregarError(new Error_(`La variable ${this.id} es una constante y no puede ser reasignada`, this.linea, this.columna, TipoError.SEMANTICO));
      }
      let nuevoValor: Resultado = { valor: 0, tipoDato: simbolo.obtenertipoDato() };
      if (simbolo.obtenertipoDato() == TipoDato.ENTERO || simbolo.obtenertipoDato() == TipoDato.DECIMAL) {
        if (this.signo == "++") {
          nuevoValor.valor = simbolo.getValor().valor + 1;
        } else if (this.signo == "--") {
          nuevoValor.valor = simbolo.getValor().valor - 1;
        } else {
          //throw new Error(`Operador ${this.signo} no permitido`);
          throw agregarError(new Error_(`Operador ${this.signo} no permitido`, this.linea, this.columna, TipoError.SEMANTICO));
        }
      } else {
        //throw new Error(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${TipoDato.ENTERO} o ${TipoDato.DECIMAL}`);
        throw agregarError(new Error_(`Tipo ${simbolo.obtenertipoDato()} no es asignable a ${TipoDato.ENTERO} o ${TipoDato.DECIMAL}`, this.linea, this.columna, TipoError.SEMANTICO));
      }
      simbolo.setValor(nuevoValor);
      simbolo.actualizarValor(nuevoValor);
      //entorno.actualizarSimbolo(this.id, simbolo);
      //console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
    } else {
      //throw new Error(`La variable ${this.id} no existe`);
      throw agregarError(new Error_(`La variable ${this.id} no existe`, this.linea, this.columna, TipoError.SEMANTICO));
    }
  }



   public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let incDecNodeT = `n${counter.get()}`;
    let idNode = `n${counter.get()}`;
    let incDecNode = `n${counter.get()}`;
    let semicolonNode = `n${counter.get()}`;

    result += `${incDecNodeT}[label="Incremento_Decremento"];\n`;
    result += `${idNode}[label="${this.id}"];\n`;
    result += `${incDecNode}[label="${this.signo}"];\n`;
    result += `${semicolonNode}[label=";"];\n`;

    result += `${last} -> ${incDecNodeT};\n`;
    result += `${incDecNodeT} -> ${idNode};\n`;
    result += `${incDecNodeT} -> ${incDecNode};\n`;
    result += `${incDecNodeT} -> ${semicolonNode};\n`;

    return result;
  }

}