"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpAritmetico = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
class Aritmetica extends Expresion_1.Expresion {
    constructor(operador1, operador2, operador, linea, columna) {
        super(linea, columna);
        this.operador1 = operador1;
        this.operador2 = operador2;
        this.operador = operador;
    }
    calcular(entorno) {
        const exp1 = this.operador1.calcular(entorno);
        const exp2 = this.operador2.calcular(entorno);
        // NEGACION
        if (this.operador == OpAritmetico.NEGACION) {
            const exp1 = this.operador2.calcular(entorno);
            const tipo1 = exp1.tipoDato;
            switch (tipo1) {
                // NEGACION de ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    return { valor: parseInt(exp1.valor) * -1, tipoDato: Tipos_1.TipoDato.ENTERO };
                // NEGACION de DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    return { valor: parseFloat(exp1.valor) * -1, tipoDato: Tipos_1.TipoDato.DECIMAL };
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
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO + ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) + parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO + DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO + BOOLEANO
                        case Tipos_1.TipoDato.BOOLEANO:
                            return { valor: parseInt(exp1.valor) + (exp2.valor ? 1 : 0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO + CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) + exp2.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO + STRING
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL + ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL + DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) + parseFloat(exp2.valor)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL + BOOLEANO
                        case Tipos_1.TipoDato.BOOLEANO:
                            return { valor: (parseFloat(exp1.valor) + (exp2.valor ? 1 : 0)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL + CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) + exp2.valor.charCodeAt(0)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL + STRING
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // BOOLEANO
                case Tipos_1.TipoDato.BOOLEANO:
                    switch (tipo2) {
                        // BOOLEANO + ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: (exp1.valor ? 1 : 0) + parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // BOOLEANO + DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: ((exp1.valor ? 1 : 0) + parseFloat(exp2.valor)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // BOOLEANO + STRING
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor ? 1 : 0) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case Tipos_1.TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR + ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) + parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // CHAR + DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) + parseFloat(exp2.valor)).toFixed(2), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // CHAR + CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        // CHAR + STRING
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        default:
                            throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // STRING
                case Tipos_1.TipoDato.STRING:
                    switch (tipo2) {
                        case Tipos_1.TipoDato.ENTERO:
                        case Tipos_1.TipoDato.DECIMAL:
                        case Tipos_1.TipoDato.BOOLEANO:
                        case Tipos_1.TipoDato.CHAR:
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
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
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO - ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) - parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO - DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO - BOOLEANO
                        case Tipos_1.TipoDato.BOOLEANO:
                            return { valor: parseInt(exp1.valor) - (exp2.valor ? 1 : 0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO - CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) - exp2.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL - ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL - DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) - parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL - BOOLEANO
                        case Tipos_1.TipoDato.BOOLEANO:
                            return { valor: (parseFloat(exp1.valor) - (exp2.valor ? 1 : 0)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL - CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) - exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // BOOLEANO
                case Tipos_1.TipoDato.BOOLEANO:
                    switch (tipo2) {
                        // BOOLEANO - ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: (exp1.valor ? 1 : 0) - parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // BOOLEANO - DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: ((exp1.valor ? 1 : 0) - parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case Tipos_1.TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR - ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) - parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // CHAR - DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) - parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
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
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO * ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) * parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO * DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO * CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: parseInt(exp1.valor) * exp2.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        default:
                            throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL * ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL * DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (parseFloat(exp1.valor) * parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL * CHAR
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: (parseFloat(exp1.valor) * exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case Tipos_1.TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR * ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: exp1.valor.charCodeAt(0) * parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // CHAR * DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: (exp1.valor.charCodeAt(0) * parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
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
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO / ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: parseInt(exp1.valor) / parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO / CHAR
                        case Tipos_1.TipoDato.CHAR:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: parseInt(exp1.valor) / exp2.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL / ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL / CHAR
                        case Tipos_1.TipoDato.CHAR:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: (parseFloat(exp1.valor) / exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // CHAR
                case Tipos_1.TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR / ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: exp1.valor.charCodeAt(0) / parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // CHAR / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                throw new Error("No se puede dividir entre 0");
                            return { valor: (exp1.valor.charCodeAt(0) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                    }
            }
        }
        // potencia 2 ^ 2
        if (this.operador == OpAritmetico.POTENCIA) {
            const tipo1 = exp1.tipoDato;
            const tipo2 = exp2.tipoDato;
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO ^ ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: Math.pow(parseInt(exp1.valor), parseInt(exp2.valor)), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO ^ DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: Math.pow(parseInt(exp1.valor), parseFloat(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL ^ ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: Math.pow(parseFloat(exp1.valor), parseInt(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL ^ DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: Math.pow(parseFloat(exp1.valor), parseFloat(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
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
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO $ ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: Math.pow(parseInt(exp1.valor), 1 / parseInt(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO $ DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: Math.pow(parseInt(exp1.valor), 1 / parseFloat(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL $ ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: Math.pow(parseFloat(exp1.valor), 1 / parseInt(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL $ DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: Math.pow(parseFloat(exp1.valor), 1 / parseFloat(exp2.valor)), tipoDato: Tipos_1.TipoDato.DECIMAL };
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
            switch (tipo1) {
                // ENTERO
                case Tipos_1.TipoDato.ENTERO:
                    switch (tipo2) {
                        // ENTERO % ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: parseInt(exp1.valor) % parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        // ENTERO % DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL % ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL % DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: parseFloat(exp1.valor) % parseFloat(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                    }
                default:
                    throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
            }
        }
        return { valor: null, tipoDato: Tipos_1.TipoDato.NULO };
    }
}
exports.Aritmetica = Aritmetica;
var OpAritmetico;
(function (OpAritmetico) {
    OpAritmetico[OpAritmetico["NEGACION"] = 0] = "NEGACION";
    OpAritmetico[OpAritmetico["SUMA"] = 1] = "SUMA";
    OpAritmetico[OpAritmetico["RESTA"] = 2] = "RESTA";
    OpAritmetico[OpAritmetico["PRODUCTO"] = 3] = "PRODUCTO";
    OpAritmetico[OpAritmetico["DIVISION"] = 4] = "DIVISION";
    OpAritmetico[OpAritmetico["POTENCIA"] = 5] = "POTENCIA";
    OpAritmetico[OpAritmetico["RAIZ"] = 6] = "RAIZ";
    OpAritmetico[OpAritmetico["MODULO"] = 7] = "MODULO";
})(OpAritmetico || (exports.OpAritmetico = OpAritmetico = {}));
