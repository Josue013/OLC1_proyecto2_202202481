import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Logico extends Expresion {
    constructor(private exp1: Expresion, private exp2: Expresion | null, private operador: OperadorLogico, linea: number, columna: number) {
        super(linea, columna);
    }

    public calcular(entorno: Entorno): Resultado {
        const resultado1 = this.exp1.calcular(entorno);

        // NOT
        if (this.operador === OperadorLogico.NOT) {
            if (resultado1.tipoDato !== TipoDato.BOOLEANO) {
                //throw new Error("El tipo de dato no es booleano");
                throw agregarError(new Error_("El tipo de dato no es booleano", this.linea, this.columna, TipoError.SEMANTICO));
            }
            return { valor: !resultado1.valor, tipoDato: TipoDato.BOOLEANO };
        }

        if (this.exp2 === null) {
            //throw new Error("La segunda expresión no puede ser nula para operadores AND y OR");
            throw agregarError(new Error_("La segunda expresión no puede ser nula para operadores AND y OR", this.linea, this.columna, TipoError.SEMANTICO));
        }

        const resultado2 = this.exp2.calcular(entorno);

        if (resultado1.tipoDato !== TipoDato.BOOLEANO || resultado2.tipoDato !== TipoDato.BOOLEANO) {
            //throw new Error("El tipo de dato no es booleano");
            throw agregarError(new Error_("El tipo de dato no es booleano", this.linea, this.columna, TipoError.SEMANTICO));
        }

        // AND
        if (this.operador === OperadorLogico.AND) {
            return { valor: resultado1.valor && resultado2.valor, tipoDato: TipoDato.BOOLEANO };
        }

        // OR
        if (this.operador === OperadorLogico.OR) {
            return { valor: resultado1.valor || resultado2.valor, tipoDato: TipoDato.BOOLEANO };
        }

        throw agregarError(new Error_("Operador lógico no reconocido", this.linea, this.columna, TipoError.SEMANTICO));

    }

    /*  EXPRESION OPERADOR EXPRESION  */

    public getAST(anterior: string): string {
        let result = "";
        let counter = Contador.getInstancia();
        let logicoNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let operadorNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;

        result += `${logicoNode}[label="Operador Logico"];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${operadorNode}[label="${this.getOperador()}"];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;

        result += `${anterior} -> ${logicoNode};\n`;
        result += `${logicoNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${logicoNode} -> ${operadorNode};\n`;

        if (this.exp2 != null) {
            result += `${logicoNode} -> ${exp2Node};\n`;
            result += this.exp2.getAST(exp2Node);
        }

        return result;
    }

    private getOperador(): string {
        switch (this.operador) {
            case OperadorLogico.AND:
                return "&&";
            case OperadorLogico.OR:
                return "||";
            case OperadorLogico.NOT:
                return "!";
            default:
                return "";
        }
    }

}

export enum OperadorLogico {
    AND,
    OR,
    NOT
}