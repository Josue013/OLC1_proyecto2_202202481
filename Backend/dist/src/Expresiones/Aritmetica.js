"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpAritmetico = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
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
                    //throw new Error(`Negacion Invalida para ${tipo1}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Negacion Invalida para ${tipo1}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                // STRING
                case Tipos_1.TipoDato.STRING:
                    switch (tipo2) {
                        case Tipos_1.TipoDato.ENTERO:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        case Tipos_1.TipoDato.DECIMAL:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        case Tipos_1.TipoDato.BOOLEANO:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        case Tipos_1.TipoDato.CHAR:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        case Tipos_1.TipoDato.STRING:
                            return { valor: String(exp1.valor) + String(exp2.valor), tipoDato: Tipos_1.TipoDato.STRING };
                        default:
                            //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Suma Invalida entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Suma Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Resta Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Resta Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Resta Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Resta Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Resta Invalida entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Resta Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Multiplicacion Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: parseInt(exp1.valor) / parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // ENTERO / CHAR
                        case Tipos_1.TipoDato.CHAR:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: parseInt(exp1.valor) / exp2.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            //throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Division Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                // DECIMAL
                case Tipos_1.TipoDato.DECIMAL:
                    switch (tipo2) {
                        // DECIMAL / ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: (parseFloat(exp1.valor) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // DECIMAL / CHAR
                        case Tipos_1.TipoDato.CHAR:
                            if (exp2.valor == 0)
                                //    throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: (parseFloat(exp1.valor) / exp2.valor.charCodeAt(0)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            //throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Division Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                // CHAR
                case Tipos_1.TipoDato.CHAR:
                    switch (tipo2) {
                        // CHAR / ENTERO
                        case Tipos_1.TipoDato.ENTERO:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: exp1.valor.charCodeAt(0) / parseInt(exp2.valor), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        // CHAR / DECIMAL
                        case Tipos_1.TipoDato.DECIMAL:
                            if (exp2.valor == 0)
                                //throw new Error("No se puede dividir entre 0")
                                throw (0, AST_1.agregarError)(new Errores_1.Error_("No se puede dividir entre 0", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                            return { valor: (exp1.valor.charCodeAt(0) / parseFloat(exp2.valor)).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        default:
                            //throw new Error(`Division Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Division Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Potencia Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Potencia Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Potencia Invalida entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Potencia Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Raiz Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Raiz Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Raiz Invalida entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Raiz Invalida entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Modulo Invalido entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
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
                            //throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Modulo Invalido entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                    }
                default:
                    //throw new Error(`Modulo Invalido entre ${tipo1} y ${tipo2}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Modulo Invalido entre ${tipo1} y ${tipo2}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
        return { valor: null, tipoDato: Tipos_1.TipoDato.NULO };
    }
    getAST(anterior) {
        let contador = Contador_1.default.getInstancia();
        let resultado = "";
        if (this.operador === OpAritmetico.NEGACION) {
            let nodoNegacion = `n${contador.get()}`;
            let nodoExp = `n${contador.get()}`;
            resultado += `${nodoNegacion}[label="-"];\n`;
            resultado += `${nodoExp}[label="EXPRESION ARITMETICA"];\n`;
            resultado += `${anterior} -> ${nodoNegacion};\n`;
            resultado += `${anterior} -> ${nodoExp};\n`;
            resultado += this.operador1.getAST(nodoExp);
            return resultado;
        }
        let nodoExp1 = `n${contador.get()}`;
        let nodoOperacion = `n${contador.get()}`;
        let nodoExp2 = `n${contador.get()}`;
        resultado += `${nodoExp1}[label="EXPRESION ARITMETICA"];\n`;
        switch (this.operador) {
            case OpAritmetico.SUMA:
                resultado += `${nodoOperacion}[label="+"];\n`;
                break;
            case OpAritmetico.RESTA:
                resultado += `${nodoOperacion}[label="-"];\n`;
                break;
            case OpAritmetico.PRODUCTO:
                resultado += `${nodoOperacion}[label="*"];\n`;
                break;
            case OpAritmetico.DIVISION:
                resultado += `${nodoOperacion}[label="/"];\n`;
                break;
            case OpAritmetico.POTENCIA:
                resultado += `${nodoOperacion}[label="^"];\n`;
                break;
            case OpAritmetico.RAIZ:
                resultado += `${nodoOperacion}[label="$"];\n`;
                break;
            case OpAritmetico.MODULO:
                resultado += `${nodoOperacion}[label="%"];\n`;
                break;
            default:
                throw new Error("Operador aritmético no reconocido");
        }
        resultado += `${nodoExp2}[label="EXPRESION ARITMETICA"];\n`;
        resultado += `${anterior} -> ${nodoExp1};\n`;
        resultado += `${anterior} -> ${nodoOperacion};\n`;
        resultado += `${anterior} -> ${nodoExp2};\n`;
        resultado += this.operador1.getAST(nodoExp1);
        resultado += this.operador2.getAST(nodoExp2);
        return resultado;
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
