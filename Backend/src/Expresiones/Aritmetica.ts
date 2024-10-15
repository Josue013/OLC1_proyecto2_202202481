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
        
        // NEGACION
        if (this.operador == OpAritmetico.NEGACION) {
            const exp1 = this.operador2.calcular(entorno);
            const tipo1 = exp1.tipoDato;

            switch (tipo1) {
                // NEGACION de ENTERO
                case TipoDato.ENTERO:
                    return { valor: parseInt(exp1.valor) * -1, tipoDato: TipoDato.ENTERO };
                // NEGACION de DECIMAL
                case TipoDato.DECIMAL:
                    return { valor: parseFloat(exp1.valor) * -1, tipoDato: TipoDato.DECIMAL };
                default:
                    throw new Error(`Negacion Invalida para ${tipo1}`);
            }
        }
        // Operación de suma
        if (this.operador == OpAritmetico.SUMA) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1) {
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO + ENTERO
                        case TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) + parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // ENTERO + DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // ENTERO + BOOLEANO
                        case TipoDato.BOOLEANO:
                            return { valor: parseInt(exp1.valor) + (exp2.valor ? 1 : 0), tipoDato: TipoDato.ENTERO };
                        // ENTERO + CHAR
                        case TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) + exp2.valor.charCodeAt(0), tipoDato: TipoDato.ENTERO };
                        // ENTERO + STRING
                        case TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL + ENTERO
                        case TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL + DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL + BOOLEANO
                        case TipoDato.BOOLEANO:
                            return { valor: (parseFloat(exp1.valor) + (exp2.valor ? 1 : 0)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL + CHAR
                        case TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) + exp2.valor.charCodeAt(0)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL + STRING
                        case TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // BOOLEANO
                case TipoDato.BOOLEANO:
                    switch (tipo2) {
                        // BOOLEANO + ENTERO
                        case TipoDato.ENTERO:
                            return { valor: (exp1.valor ? 1 : 0) + parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // BOOLEANO + DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: ((exp1.valor ? 1 : 0) + parseFloat(exp2.valor)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // BOOLEANO + STRING
                        case TipoDato.STRING:
                            return { valor: String(exp1.valor ? 1 : 0) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR + ENTERO
                        case TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) + parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // CHAR + DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) + parseFloat(exp2.valor)).toFixed(2), tipoDato: TipoDato.DECIMAL };
                        // CHAR + CHAR
                        case TipoDato.CHAR:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        // CHAR + STRING
                        case TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // STRING
                case TipoDato.STRING:
                    switch (tipo2) {
                        case TipoDato.ENTERO:
                        case TipoDato.DECIMAL:
                        case TipoDato.BOOLEANO:
                        case TipoDato.CHAR:
                        case TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
            }
        }
        // Operación de resta
        if (this.operador == OpAritmetico.RESTA) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO - ENTERO
                        case TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) - parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // ENTERO - DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // ENTERO - BOOLEANO
                        case TipoDato.BOOLEANO:
                            return { valor: parseInt(exp1.valor) - (exp2.valor ? 1 : 0), tipoDato: TipoDato.ENTERO };
                        // ENTERO - CHAR
                        case TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) - exp2.valor.charCodeAt(0), tipoDato: TipoDato.ENTERO };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL - ENTERO
                        case TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL - DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL - BOOLEANO
                        case TipoDato.BOOLEANO:
                            return { valor: (parseFloat(exp1.valor) - (exp2.valor ? 1 : 0)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL - CHAR
                        case TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) - exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // BOOLEANO
                case TipoDato.BOOLEANO:
                    switch (tipo2) {
                        // BOOLEANO - ENTERO
                        case TipoDato.ENTERO:
                            return { valor: (exp1.valor ? 1 : 0) - parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // BOOLEANO - DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: ((exp1.valor ? 1 : 0) - parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR - ENTERO
                        case TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) - parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // CHAR - DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) - parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
            }
        }
        // Operación Producto
        if (this.operador == OpAritmetico.PRODUCTO) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO * ENTERO
                        case TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) * parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // ENTERO * DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // ENTERO * CHAR
                        case TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) * exp2.valor.charCodeAt(0), tipoDato: TipoDato.ENTERO };
                        default:
                            throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL * ENTERO
                        case TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL * DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL * CHAR
                        case TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) * exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR * ENTERO
                        case TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) * parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // CHAR * DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) * parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
            }
        }
        // Operación Division
        if (this.operador == OpAritmetico.DIVISION) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO / ENTERO
                        case TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: parseInt(exp1.valor) / parseInt(exp2.valor), tipoDato: TipoDato.DECIMAL };
                        // ENTERO / DECIMAL
                        case TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // ENTERO / CHAR
                        case TipoDato.CHAR:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: parseInt(exp1.valor) / exp2.valor.charCodeAt(0), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL / ENTERO
                        case TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL / DECIMAL
                        case TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL / CHAR
                        case TipoDato.CHAR:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: (parseFloat(exp1.valor) / exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR / ENTERO
                        case TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: exp1.valor.charCodeAt(0) / parseInt(exp2.valor), tipoDato: TipoDato.DECIMAL };
                        // CHAR / DECIMAL
                        case TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0")
                            return { valor: (exp1.valor.charCodeAt(0) / parseFloat(exp2.valor)).toFixed(4), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
            }
        }
        // potencia 2 ^ 2
        if (this.operador == OpAritmetico.POTENCIA) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO ^ ENTERO
                        case TipoDato.ENTERO:
                            return { valor: Math.pow(parseInt(exp1.valor), parseInt(exp2.valor)), tipoDato: TipoDato.ENTERO };
                        // ENTERO ^ DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: Math.pow(parseInt(exp1.valor), parseFloat(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL ^ ENTERO
                        case TipoDato.ENTERO:
                            return { valor: Math.pow(parseFloat(exp1.valor), parseInt(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL ^ DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: Math.pow(parseFloat(exp1.valor), parseFloat(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
            }
        }
        // raiz 2 $ 2
        if (this.operador == OpAritmetico.RAIZ) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO $ ENTERO
                        case TipoDato.ENTERO:
                            return { valor: Math.pow(parseInt(exp1.valor), 1 / parseInt(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        // ENTERO $ DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: Math.pow(parseInt(exp1.valor), 1 / parseFloat(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL $ ENTERO
                        case TipoDato.ENTERO:
                            return { valor: Math.pow(parseFloat(exp1.valor), 1 / parseInt(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL $ DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: Math.pow(parseFloat(exp1.valor), 1 / parseFloat(exp2.valor)), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
            }

        }
        // modulo 2 % 2
        if (this.operador == OpAritmetico.MODULO) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;

            switch (tipo1){
                // ENTERO
                case TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO % ENTERO
                        case TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) % parseInt(exp2.valor), tipoDato: TipoDato.ENTERO };
                        // ENTERO % DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL % ENTERO
                        case TipoDato.ENTERO:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: TipoDato.DECIMAL };
                        // DECIMAL % DECIMAL
                        case TipoDato.DECIMAL:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: TipoDato.DECIMAL };
                        default:
                            throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
            }
        }
        return { valor: null, tipoDato: TipoDato.NULO }
    }

}

export enum OpAritmetico {
    NEGACION,
    SUMA,
    RESTA,
    PRODUCTO,
    DIVISION,
    POTENCIA,
    RAIZ,
    MODULO
}