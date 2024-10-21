import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../../Expresiones/Expresion";
import { TipoDato } from "../../Expresiones/Tipos";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Case } from "./Case";
import { Default } from "./Default";
import { Return } from "../Return";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";
import Contador from "../../Entorno/Contador";

export class Switch extends Instruccion {
  cond: Expresion; // Expresión que representa la condición del switch
  cases: Case[] | null; // Lista de casos del switch
  Default: Default | null; // Caso default del switch

  constructor(cond: Expresion, cases: Case[] | null, Default: Default | null, line: number, column: number) {
    super(line, column);
    this.cond = cond;
    this.cases = cases;
    this.Default = Default;
  }
  
  public ejecutar(entorno: Entorno): any {
    // Verifica que haya al menos un caso o un default
    if (this.cases == null && this.Default == null) {
      //throw new Error("Error en Switch: No hay casos ni default");
      throw agregarError(new Error_("Error en Switch: No hay casos ni default", this.linea, this.columna, TipoError.SEMANTICO));
    }

    let valor = false; // Indica si se ha encontrado un caso coincidente
    let Default2 = true; // Indica si se debe ejecutar el caso default

    const cond = this.cond.calcular(entorno); // Calcula el valor de la condición del switch
    const nuevoEntorno = new Entorno(entorno); // Crea un nuevo entorno para los casos

    if (this.cases != null) {
      for (const Case of this.cases) {
        const c = Case.cond.calcular(nuevoEntorno); // Calcula el valor de la condición del caso
        // Verifica si el valor y el tipo de dato coinciden con la condición del switch
        if (c.valor == cond.valor && c.tipoDato == cond.tipoDato && !valor) {
          const r = Case.ejecutar(nuevoEntorno); // Ejecuta el caso
          if (r != null || r != undefined) {
            if (r instanceof Break) {
              Default2 = false; // No se ejecuta el caso default
              break;
            } else if (r.typeValue == 'return') {
              return r; // Retorna el valor si es una instrucción de retorno
            } else {
              //throw new Error("Error en Case");
              throw agregarError(new Error_("Error en Case", this.linea, this.columna, TipoError.SEMANTICO));
            }
          }
          valor = true; // Indica que se ha encontrado un caso coincidente
        } else if (valor) {
          const r = Case.ejecutar(nuevoEntorno); // Ejecuta el caso si ya se ha encontrado un caso coincidente
          if (r != null || r != undefined) {
            if (r instanceof Break) {
              Default2 = false; // No se ejecuta el caso default
              valor = false;
              break;
            } else if (r.typeValue == 'return') {
              return r; // Retorna el valor si es una instrucción de retorno
            } else {
              throw agregarError(new Error_("Error en Case", this.linea, this.columna, TipoError.SEMANTICO));
            }
          }
        }
      }
      // Ejecuta el caso default si se ha encontrado un caso coincidente
      if (this.Default != null && valor) {
        Default2 = false;
        const r = this.Default.ejecutar(nuevoEntorno);
        if (r != null || r != undefined) {
          if (r instanceof Break) {
            return;
          } else if (r.typeValue == 'return') {
            return r;
          } else {
            throw agregarError(new Error_("Error en Case", this.linea, this.columna, TipoError.SEMANTICO));
          }
        }
      }
    }
    // Ejecuta el caso default si no se ha encontrado un caso coincidente
    if (this.Default != null && Default2) {
      const r = this.Default.ejecutar(nuevoEntorno);
      if (r != null || r != undefined) {
        if (r instanceof Break) {
          return;
        } else if (r instanceof Return) {
          return r;
        } else {
          throw agregarError(new Error_("Error en Case", this.linea, this.columna, TipoError.SEMANTICO));
        }
      }
    }
  }

  public getAST(last: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let switchNodeT = `n${counter.get()}`;
    let switchNode = `n${counter.get()}`;
    let lParenNode = `n${counter.get()}`;
    let expNode = `n${counter.get()}`;
    let rParenNode = `n${counter.get()}`;
    let lBraceNode = `n${counter.get()}`;
    let casesNode = `n${counter.get()}`;
    let defaultNode = `n${counter.get()}`;
    let rBraceNode = `n${counter.get()}`;

    result += `${switchNodeT}[label="I_Switch"];\n`;
    result += `${switchNode}[label="switch"];\n`;
    result += `${lParenNode}[label="("];\n`;
    result += `${expNode}[label="exp"];\n`;
    result += `${rParenNode}[label=")"];\n`;
    result += `${lBraceNode}[label="{" ];\n`;
    result += `${casesNode}[label="Cases"];\n`;
    result += `${defaultNode}[label="Default"];\n`;
    result += `${rBraceNode}[label="}"];\n`;

    result += `${last} -> ${switchNodeT};\n`;
    result += `${switchNodeT} -> ${switchNode};\n`;
    result += `${switchNodeT} -> ${lParenNode};\n`;
    result += `${switchNodeT} -> ${expNode};\n`;
    result += this.cond.getAST(expNode);
    result += `${switchNodeT} -> ${rParenNode};\n`;
    result += `${switchNodeT} -> ${lBraceNode};\n`;
    result += `${switchNodeT} -> ${casesNode};\n`;

    if (this.cases != null) {
      for (const Case of this.cases) {
        result += Case.getAST(casesNode);
      }
    }

    result += `${switchNodeT} -> ${defaultNode};\n`;
    if (this.Default != null) {
      result += this.Default.getAST(defaultNode);
    }

    result += `${switchNodeT} -> ${rBraceNode};\n`;
    return result;
  }


}