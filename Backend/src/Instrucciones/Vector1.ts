import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Vector1 extends Instruccion {
    public id: string[]; // Identificadores del vector
    public tipo: string; // Tipo de dato del vector
    public tipo2: string; // Tipo de dato secundario para verificación
    public exp1: Expresion; // Expresión que define el tamaño del vector
    public exp2: Expresion | null; // Expresión opcional para definir una segunda dimensión del vector

    constructor(id: string[], tipo: string, tipo2: string, exp1: Expresion, exp2: Expresion | null, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    public ejecutar(entorno: Entorno): void {
        // Verifica que los tipos coincidan
        if (this.tipo2 !== this.tipo) {
            //throw new Error(`Tipo ${this.tipo2} no coincide con ${this.tipo}`);
            throw agregarError(new Error_(`Tipo ${this.tipo2} no coincide con ${this.tipo}`, this.linea, this.columna, TipoError.SEMANTICO));
        }

        let tipoDominante: TipoDato;
        let valorPredeterminado: any;

        // Definir el tipo dominante según el tipo de dato
        switch (this.tipo) {
            case "int":
                tipoDominante = TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipoDominante = TipoDato.DECIMAL;
                valorPredeterminado = 0.0;
                break;
            case "bool":
                tipoDominante = TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipoDominante = TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipoDominante = TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                //throw new Error(`Tipo ${this.tipo} no permitido para la declaración de vectores`);
                throw agregarError(new Error_(`Tipo ${this.tipo} no permitido para la declaración de vectores`, this.linea, this.columna, TipoError.SEMANTICO));
        }

        // Calcular el tamaño del vector
        const exp1Resultado = this.exp1.calcular(entorno);

        if (this.exp2 != null) {
            const exp2Resultado = this.exp2.calcular(entorno);
            // Verifica que las posiciones sean de tipo entero
            if (exp1Resultado.tipoDato != TipoDato.ENTERO || exp2Resultado.tipoDato != TipoDato.ENTERO) {
                //throw new Error("La posición del vector debe ser de tipo entero");
                throw agregarError(new Error_(`La posición del vector debe ser de tipo entero`, this.linea, this.columna, TipoError.SEMANTICO));
            }
            // Guarda el vector en el entorno con dos dimensiones
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, exp2Resultado.valor, this.linea, this.columna);
        } else {
            // Verifica que la posición sea de tipo entero
            if (exp1Resultado.tipoDato != TipoDato.ENTERO) {
                //throw new Error("La posición del vector debe ser de tipo entero");
                throw agregarError(new Error_(`La posición del vector debe ser de tipo entero`, this.linea, this.columna, TipoError.SEMANTICO));
            }
            // Guarda el vector en el entorno con una dimensión
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, 1, this.linea, this.columna);
        }
        // Inicializa los valores predeterminados del vector
        entorno.obtenerArreglo(this.id[0])?.inicializarValoresPredeterminados("Vector", tipoDominante, valorPredeterminado, this.linea, this.columna);
    }

    /* LET ID : TIPO ([] | [][]) = new vector TIPO ( [ EXPRESION ] | [ EXPRESION ][ EXPRESION ]) */

    public getAST(anterior: string): string {
        let result = "";
        let counter = Contador.getInstancia();
        let declarationNode = `n${counter.get()}`;
        let letNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        let lBracketNode = `n${counter.get()}`;
        let rBracketNode = `n${counter.get()}`;
        let equalNode = `n${counter.get()}`;
        let newNode = `n${counter.get()}`;
        let vectorNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;

        result += `${declarationNode}[label="Declaración Vector"];\n`;
        result += `${letNode}[label="LET"];\n`;
        result += `${idNode}[label="${this.id[0]}"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${typeNode}[label="${this.tipo}"];\n`;
        result += `${lBracketNode}[label="["];\n`;
        result += `${rBracketNode}[label="]"];\n`;
        result += `${equalNode}[label="="];\n`;
        result += `${newNode}[label="new"];\n`;
        result += `${vectorNode}[label="vector"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${rParenNode}[label=")"];\n`;

        result += `${anterior} -> ${declarationNode};\n`;
        result += `${declarationNode} -> ${letNode};\n`;
        result += `${declarationNode} -> ${idNode};\n`;
        result += `${declarationNode} -> ${colonNode};\n`;
        result += `${declarationNode} -> ${typeNode};\n`;
        result += `${declarationNode} -> ${lBracketNode};\n`;
        result += `${declarationNode} -> ${rBracketNode};\n`;
        result += `${declarationNode} -> ${equalNode};\n`;
        result += `${declarationNode} -> ${newNode};\n`;
        result += `${declarationNode} -> ${vectorNode};\n`;
        result += `${declarationNode} -> ${lParenNode};\n`;
        result += `${declarationNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${declarationNode} -> ${rParenNode};\n`;

        if (this.exp2 != null) {
            let exp2Node = `n${counter.get()}`;
            result += `${exp2Node}[label="Expresion"];\n`;
            result += `${declarationNode} -> ${exp2Node};\n`;
            result += this.exp2.getAST(exp2Node);
        }

        return result;
    }

}