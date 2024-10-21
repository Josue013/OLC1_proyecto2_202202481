import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Bloque } from "./Bloque";
import { Return } from "./Return";
import { Break } from "./Break";
import { Continue } from "./Continue";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Llamada extends Instruccion {

  public id: string; // Identificador de la función
  public parametros: Array<{ id: string, exp: Expresion }>; // Lista de parámetros de la función
  public bandera: boolean; 

  constructor(id: string, parametros: Array<{ id: string, exp: Expresion }>, bandera: boolean, line: number, column: number) {
    super(line, column);
    this.id = id;
    this.parametros = parametros;
    this.bandera = bandera;
  }

  public ejecutar(entorno: Entorno): any {

    // obtener la función del entorno
    const funcion = entorno.obtenerFuncion(this.id);
    
    //entorno.imprimirFunciones();

    // Verificar si la función existe en el entorno
    if (!funcion) {
      //throw new Error(`La función ${this.id} no está definida ni en el entorno local ni en el global.`);
      throw agregarError(new Error_(`La función ${this.id} no está definida ni en el entorno local ni en el global.`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Obtener los parámetros de la función
    const parametros = funcion.parametros;
    const totalParametros = parametros.length;
    const totalParametrosLlamada = this.parametros.length;

    // Verificar que la cantidad de argumentos sea válida
    if (totalParametrosLlamada > totalParametros) {
      //throw new Error(`La función ${this.id} esperaba ${totalParametros} parámetros, pero se recibieron ${totalParametrosLlamada}.`);
      throw agregarError(new Error_(`La función ${this.id} esperaba ${totalParametros} parámetros, pero se recibieron ${totalParametrosLlamada}.`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    // Crear un nuevo entorno para la función con el entorno actual como padre
    const newEnv = new Entorno(entorno.obtenerEntornoGlobal());

    // Declarar y reasignar parámetros
    for (let i = 0; i < totalParametros; i++) {
      const parametro = parametros[i];
      const argumento = i < totalParametrosLlamada ? this.parametros[i].exp.calcular(entorno) : parametro.exp?.calcular(entorno);

      if (argumento === undefined) {
        //throw new Error(`El parámetro ${parametro.id} no tiene un valor asignado en la llamada a la función ${this.id}.`);
        throw agregarError(new Error_(`El parámetro ${parametro.id} no tiene un valor asignado en la llamada a la función ${this.id}.`, this.linea, this.columna, TipoError.SEMANTICO));
      }

      // Guardar el valor del parámetro en el nuevo entorno
      newEnv.guardarVariable(parametro.id, argumento, argumento.tipoDato, false, this.linea, this.columna);
    }



    // Obtener el bloque de instrucciones de la función
    const instrucciones = funcion.instrucciones;

    //console.log(instrucciones);

    // Ejecutar el cuerpo de la función en el nuevo entorno
    const transfer = instrucciones.ejecutar(newEnv);

    //console.log("=========================================");
    //console.log("Retorno de la función: " + this.id);
    //console.log(transfer);
    //console.log("=========================================");

    if (transfer != null) {
      if (transfer?.typeValue == 'return') {
        if (funcion.tipoDato === transfer.type || (funcion.tipoDato === TipoDato.NULO && transfer.value === null)) {
          return {
            value: transfer.value,
            type: funcion.tipoDato
          };
        } else {
          //throw new Error(`El tipo de dato de retorno de la función ${this.id} no coincide con el tipo de dato esperado`);
          throw agregarError(new Error_(`El tipo de dato de retorno de la función ${this.id} no coincide con el tipo de dato esperado`, this.linea, this.columna, TipoError.SEMANTICO));
        }
      } else if (transfer instanceof Break || transfer instanceof Continue) {
        //throw new Error(`Instrucción ${transfer.constructor.name} no permitida fuera de un ciclo`);
        throw agregarError(new Error_(`Instrucción ${transfer.constructor.name} no permitida fuera de un ciclo`, this.linea, this.columna, TipoError.SEMANTICO));
      }
    }

    if (funcion.tipoDato === TipoDato.NULO) {
      return null;
    } else {
      //throw new Error(`Tipo de retorno ${transfer.type} esperado en la función ${this.id}`);
      throw agregarError(new Error_(`Tipo de retorno ${transfer.type} esperado en la función ${this.id}`, this.linea, this.columna, TipoError.SEMANTICO));
    }
  }

  public calcular(entorno: Entorno): Resultado {
    let resultado = this.ejecutar(entorno);
    return { valor: resultado.value, tipoDato: resultado.type };
  }

  /* ID ( PARAMETROS ) */

  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let functionNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    result += `${functionNode}[label="${this.id}"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${anterior} -> ${functionNode};\n`;
    result += `${anterior} -> ${lParenNode};\n`;

    if (this.parametros.length != 0) {
      let first = `n${counter.get()}`;
      result += `${first}[label="parametro"];\n`;
      result += `${anterior} -> ${first};\n`;
      result += this.parametros[0].exp.getAST(first);
      for (let i = 1; i < this.parametros.length; i++) {
        if (i < this.parametros.length) {
          let comma = `n${counter.get()}`;
          result += `${comma}[label=","];\n`;
          result += `${anterior} -> ${comma};\n`;
        }
        let param = `n${counter.get()}`;
        result += `${param}[label="parametro"];\n`;
        result += `${anterior} -> ${param};\n`;
        result += this.parametros[i].exp.getAST(param);
      }
    }

    let rParenNode = `n${counter.get()}`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${anterior} -> ${rParenNode};\n`;
    return result;
  }

}