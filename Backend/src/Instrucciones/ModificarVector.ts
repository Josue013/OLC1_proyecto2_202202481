import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";
import { Instruccion } from "./Instruccion";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class ModificarVector extends Instruccion {
  
  private id: string;               // Identificador del vector
  private exp1: Expresion;          // Expresión que representa la primera dimensión del vector
  private exp2: Expresion | null;   // Expresión que representa la segunda dimensión del vector (puede ser nula)
  private value: Expresion;         // Valor a asignar en la posición especificada del vector
  
  constructor(id: string, exp1: Expresion, exp2: Expresion | null, value: Expresion, line: number, column: number) {
    super(line, column);
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
    this.value = value;
  }

  public ejecutar(entorno: Entorno): null {
    // Obtiene el vector del entorno
    const vector = entorno.obtenerArreglo(this.id);

    // Verificar que this.value sea una instancia de Expresion
    if (!(this.value instanceof Expresion)) {
      //throw new Error(`El valor proporcionado no es una expresión válida`);
      throw agregarError(new Error_(`El valor proporcionado no es una expresión válida`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Calcula el valor de la expresión
    const value = this.value.calcular(entorno);

    if (vector == null) {
      //throw new Error(`La variable o vector ${this.id} no existe`);
      throw agregarError(new Error_(`La variable o vector ${this.id} no existe`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    if (vector.tipo != value.tipoDato) {
      //throw new Error(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`);
      throw agregarError(new Error_(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`, this.linea, this.columna, TipoError.SEMANTICO));
    }

     // Calcula la posición en la primera dimensión
    const exp1Resultado = this.exp1.calcular(entorno);

    if (this.exp2 != null) {
      // Calcula la posición en la segunda dimensión
      const exp2Resultado = this.exp2.calcular(entorno);
      if (exp1Resultado.tipoDato != TipoDato.ENTERO || exp2Resultado.tipoDato != TipoDato.ENTERO) {
        //throw new Error(`Tipo de dato no valido para la posicion del vector`);
        throw agregarError(new Error_(`Tipo de dato no valido para la posicion del vector`, this.linea, this.columna, TipoError.SEMANTICO));
      }
      // Asigna el valor en la posición especificada del vector
      entorno.obtenerArreglo(this.id)?.asignarValor(exp1Resultado.valor, exp2Resultado.valor, vector.id, vector.tipo, value.valor, this.linea, this.columna);
    } else {
      if (exp1Resultado.tipoDato != TipoDato.ENTERO) {
        //throw new Error(`Tipo de dato no valido para la posicion del vector`);
        throw agregarError(new Error_(`Tipo de dato no valido para la posicion del vector`, this.linea, this.columna, TipoError.SEMANTICO));
      }
      // Asigna el valor en la posición especificada del vector (unidimensional)
      entorno.obtenerArreglo(this.id)?.asignarValor(exp1Resultado.valor, 0, vector.id, vector.tipo, value.valor, this.linea, this.columna);
    }
    return null;
  }

  /* ID [ EXPRESION ] = EXPRESION ( | = EXPRESION) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let modificarVectorNode = `n${counter.get()}`;
    let idNode = `n${counter.get()}`;
    let lBracketNode = `n${counter.get()}`;
    let exp1Node = `n${counter.get()}`;
    let rBracketNode = `n${counter.get()}`;
    let equalNode = `n${counter.get()}`;
    let valueNode = `n${counter.get()}`;

    result += `${modificarVectorNode}[label="ModificarVector"];\n`;
    result += `${idNode}[label="${this.id}"];\n`;
    result += `${lBracketNode}[label="["];\n`;
    result += `${exp1Node}[label="Expresion"];\n`;
    result += `${rBracketNode}[label="]"];\n`;
    result += `${equalNode}[label="="];\n`;
    result += `${valueNode}[label="Expresion"];\n`;

    result += `${anterior} -> ${modificarVectorNode};\n`;
    result += `${modificarVectorNode} -> ${idNode};\n`;
    result += `${modificarVectorNode} -> ${lBracketNode};\n`;
    result += `${modificarVectorNode} -> ${exp1Node};\n`;
    result += this.exp1.getAST(exp1Node);
    result += `${modificarVectorNode} -> ${rBracketNode};\n`;
    result += `${modificarVectorNode} -> ${equalNode};\n`;
    result += `${modificarVectorNode} -> ${valueNode};\n`;
    result += this.value.getAST(valueNode);

    if (this.exp2 != null) {
      let pipeNode = `n${counter.get()}`;
      let exp2Node = `n${counter.get()}`;
      result += `${pipeNode}[label="|"];\n`;
      result += `${exp2Node}[label="Expresion"];\n`;
      result += `${modificarVectorNode} -> ${pipeNode};\n`;
      result += `${modificarVectorNode} -> ${exp2Node};\n`;
      result += this.exp2.getAST(exp2Node);
    }

    let semicolonNode = `n${counter.get()}`;
    result += `${semicolonNode}[label=";"];\n`;
    result += `${modificarVectorNode} -> ${semicolonNode};\n`;

    return result;
  }


}