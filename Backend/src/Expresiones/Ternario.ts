import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Ternario extends Expresion {
  condicion: Expresion; // Expresión que representa la condición del operador ternario
  instruccionV: Expresion; // Expresión que se ejecuta si la condición es verdadera
  instruccionF: Expresion; // Expresión que se ejecuta si la condición es falsa

  constructor(condicion: Expresion, instruccionV: Expresion, instruccionF: Expresion, linea: number, columna: number) {
    super(linea, columna);
    this.condicion = condicion;
    this.instruccionV = instruccionV;
    this.instruccionF = instruccionF;
  }

  public calcular(entorno: Entorno): Resultado {
    const condicion = this.condicion.calcular(entorno); // Calcula el valor de la condición
    // Verifica que el tipo de dato de la condición sea booleano
    if (condicion.tipoDato != TipoDato.BOOLEANO) {
      //throw new Error("La condición no es booleana");
      throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));
    }
    // Si la condición es verdadera, calcula y retorna el valor de instruccionV
    if (condicion.valor) {
      //console.log("Condición verdadera");
      

      let verdadero = this.instruccionV.calcular(entorno);
      //console.log(verdadero);
      return verdadero;
    } else {
      // Si la condición es falsa, calcula y retorna el valor de instruccionF
      //console.log("Condición falsa");
      let falso = this.instruccionF.calcular(entorno);
      //console.log(falso);
      return falso;
    }
  }

  /* IF ( CONDICION ) EXPRESION : EXPRESION */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let ternarioNode = `n${counter.get()}`;
    let ifNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let condicionNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let expVNode = `n${counter.get()}`;
    let colonNode = `n${counter.get()}`;
    let expFNode = `n${counter.get()}`;

    result += `${ternarioNode}[label="Operador Ternario"];\n`;
    result += `${ifNode}[label="if"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${condicionNode}[label="Condicion"];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${expVNode}[label="Expresion Verdadera"];\n`;
    result += `${colonNode}[label=":"];\n`;
    result += `${expFNode}[label="Expresion Falsa"];\n`;

    result += `${anterior} -> ${ternarioNode};\n`;
    result += `${ternarioNode} -> ${ifNode};\n`;
    result += `${ternarioNode} -> ${lParenNode};\n`;
    result += `${ternarioNode} -> ${condicionNode};\n`;
    result += this.condicion.getAST(condicionNode);
    result += `${ternarioNode} -> ${rParenNode};\n`;
    result += `${ternarioNode} -> ${expVNode};\n`;
    result += this.instruccionV.getAST(expVNode);
    result += `${ternarioNode} -> ${colonNode};\n`;
    result += `${ternarioNode} -> ${expFNode};\n`;
    result += this.instruccionF.getAST(expFNode);

    return result;
  }

}