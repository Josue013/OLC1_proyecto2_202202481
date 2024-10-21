import { Resultado, TipoDato } from "./Tipos";
import { Expresion } from "./Expresion";
import { Entorno } from "../Entorno/Entorno";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class AccesoVector extends Expresion {
  public id: string;
  public exp1: Expresion;
  public exp2: Expresion | null;

  constructor(id: string, exp1: Expresion, exp2: Expresion | null, linea: number, columna: number) {
    super(linea, columna);
    this.id = id;
    this.exp1 = exp1;
    this.exp2 = exp2;
  }

  public calcular(entorno: Entorno): Resultado {
    //entorno.imprimirArreglos();

    const vector = entorno.obtenerArreglo(this.id);
    const exp1 = this.exp1.calcular(entorno);
    
    if (exp1.tipoDato != TipoDato.ENTERO) {
      //throw new Error("La posición exp1 debe ser de tipo entero");
      throw agregarError(new Error_("La posición exp1 debe ser de tipo entero", this.linea, this.columna, TipoError.SEMANTICO));
    }

    let exp2;
    if (this.exp2 != null) {
      exp2 = this.exp2.calcular(entorno).valor;
    } else {
      exp2 = 0;
    }

    if (vector == null) {
      //throw new Error(`El vector ${this.id} no existe`);
      throw agregarError(new Error_(`El vector ${this.id} no existe`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    let valor = vector.obtenerValor(exp1.valor, exp2).valor;

    // Desanidar el valor si es necesario
    while (valor && typeof valor === 'object' && 'valor' in valor) {
      valor = valor.valor;
    }

    return { valor: valor, tipoDato: vector.tipo };
  }



  public getAST(anterior: string): string {
    let result = "";
    let counter = Contador.getInstancia();
    let vectorValueNodeT = `n${counter.get()}`;
    let idNode = `n${counter.get()}`;
    let lBracketNode = `n${counter.get()}`;
    let exp1Node = `n${counter.get()}`;
    let rBracketNode = `n${counter.get()}`;

    result += `${vectorValueNodeT}[label="AccesoVector"];\n`;
    result += `${idNode}[label="${this.id}"];\n`;
    result += `${lBracketNode}[label="["];\n`;
    result += `${exp1Node}[label="Expresion"];\n`;
    result += `${rBracketNode}[label="]"];\n`;

    result += `${anterior} -> ${vectorValueNodeT};\n`;
    result += `${vectorValueNodeT} -> ${idNode};\n`;
    result += `${vectorValueNodeT} -> ${lBracketNode};\n`;
    result += `${vectorValueNodeT} -> ${exp1Node};\n`;
    result += this.exp1.getAST(exp1Node);
    result += `${vectorValueNodeT} -> ${rBracketNode};\n`;

    if (this.exp2 != null) {
        let lBracketNode2 = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
        let rBracketNode2 = `n${counter.get()}`;

        result += `${lBracketNode2}[label="["];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;
        result += `${rBracketNode2}[label="]"];\n`;

        result += `${vectorValueNodeT} -> ${lBracketNode2};\n`;
        result += `${vectorValueNodeT} -> ${exp2Node};\n`;
        result += this.exp2.getAST(exp2Node);
        result += `${vectorValueNodeT} -> ${rBracketNode2};\n`;
    }

    return result;
}

}