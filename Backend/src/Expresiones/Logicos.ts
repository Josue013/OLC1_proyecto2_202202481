import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Logico extends Expresion {
    constructor(private exp1: Expresion, private exp2: Expresion | null, private operador: OperadorLogico, linea: number, columna: number) {
        super(linea, columna);
    }

    public calcular(entorno: Entorno): Resultado {
        const resultado1 = this.exp1.calcular(entorno);

        // NOT
        if (this.operador === OperadorLogico.NOT) {
            if (resultado1.tipoDato !== TipoDato.BOOLEANO) {
                throw new Error("El tipo de dato no es booleano");
            }
            return { valor: !resultado1.valor, tipoDato: TipoDato.BOOLEANO };
        }

        if (this.exp2 === null) {
            throw new Error("La segunda expresión no puede ser nula para operadores AND y OR");
        }

        const resultado2 = this.exp2.calcular(entorno);

        if (resultado1.tipoDato !== TipoDato.BOOLEANO || resultado2.tipoDato !== TipoDato.BOOLEANO) {
            throw new Error("El tipo de dato no es booleano");
        }

        // AND
        if (this.operador === OperadorLogico.AND) {
            return { valor: resultado1.valor && resultado2.valor, tipoDato: TipoDato.BOOLEANO };
        }

        // OR
        if (this.operador === OperadorLogico.OR) {
            return { valor: resultado1.valor || resultado2.valor, tipoDato: TipoDato.BOOLEANO };
        }

        throw new Error("Operador lógico no reconocido");
    }
}

export enum OperadorLogico {
    AND,
    OR,
    NOT
}