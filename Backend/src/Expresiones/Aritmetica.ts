import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";

export class Aritmetica extends Expresion {

    constructor(private operador1: Expresion, private operador2: Expresion, private operador: OpAritmetico, linea: number, columna: number) {
        super(linea, columna)
    }

    public calcular(entorno: Entorno): Resultado {
        const exp1 = this.operador1.calcular(entorno)
        const exp2 = this.operador2.calcular(entorno)
        // suma 1 + 1   
        if (this.operador == OpAritmetico.SUMA) {
            const tipoDominante = DominanteSuma[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                return { valor: exp1.valor + exp2.valor, tipoDato: tipoDominante }
            if (tipoDominante == TipoDato.STRING)
                return { valor: exp1.valor.toString() + exp2.valor.toString(), tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // resta 2 - 1
        if (this.operador == OpAritmetico.RESTA) {
            const tipoDominante = DominanteResta[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                return { valor: exp1.valor - exp2.valor, tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // producto 2 * 2
        if (this.operador == OpAritmetico.PRODUCTO) {
            const tipoDominante = DominanteProducto[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                return { valor: exp1.valor * exp2.valor, tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // division 2 / 2
        if (this.operador == OpAritmetico.DIVISION) {
            const tipoDominante = DominanteDivision[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                if (exp2.valor == 0)
                    throw new Error("No se puede dividir entre 0")
                else
                    return { valor: exp1.valor / exp2.valor, tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // potencia 2 ^ 2
        if (this.operador == OpAritmetico.POTENCIA) {
            const tipoDominante = DominantePotencia[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                return { valor: Math.pow(exp1.valor, exp2.valor), tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // raiz 2 $ 2
        if (this.operador == OpAritmetico.RAIZ) {
            const tipoDominante = DominanteRaiz[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                return { valor: Math.pow(exp1.valor, 1 / exp2.valor), tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        // modulo 2 % 2
        if (this.operador == OpAritmetico.MODULO) {
            const tipoDominante = DominanteModulo[exp1.tipoDato][exp2.tipoDato]
            if (tipoDominante == TipoDato.ENTERO || tipoDominante == TipoDato.DECIMAL)
                if (exp2.valor == 0)
                    throw new Error("No se puede dividir entre 0")
                else
                    return { valor: exp1.valor % exp2.valor, tipoDato: tipoDominante }
            throw new Error(`El tipo ${exp1.tipoDato} no se puede operar con ${exp2.tipoDato}`)
        }
        return { valor: null, tipoDato: TipoDato.NULO }
    }
}

// Dominante de las sumas
const DominanteSuma = [
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.ENTERO, TipoDato.ENTERO, TipoDato.STRING],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.STRING],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.STRING],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.STRING, TipoDato.STRING],
    [TipoDato.STRING, TipoDato.STRING, TipoDato.STRING, TipoDato.STRING, TipoDato.STRING],
]

// Dominante de las restas
const DominanteResta = [
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.ENTERO, TipoDato.ENTERO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

// Dominante de los productos
const DominanteProducto = [
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.ENTERO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

// Dominante de las divisiones
const DominanteDivision = [
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

// Dominante de las potencias
const DominantePotencia = [
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

// Dominante de las raices
const DominanteRaiz = [
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

// Dominante de los modulos
const DominanteModulo = [
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.ENTERO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.ENTERO, TipoDato.DECIMAL, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
    [TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO, TipoDato.NULO],
]

export enum OpAritmetico {
    SUMA,
    RESTA,
    PRODUCTO,
    DIVISION,
    POTENCIA,
    RAIZ,
    MODULO
}