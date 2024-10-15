"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector1 = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
class Vector1 extends Instruccion_1.Instruccion {
    constructor(id, tipo, tipo2, exp1, exp2, line, column) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }
    ejecutar(entorno) {
        var _a;
        // Verifica que los tipos coincidan
        if (this.tipo2 !== this.tipo) {
            throw new Error(`Tipo ${this.tipo2} no coincide con ${this.tipo}`);
        }
        let tipoDominante;
        let valorPredeterminado;
        // Definir el tipo dominante según el tipo de dato
        switch (this.tipo) {
            case "int":
                tipoDominante = Tipos_1.TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipoDominante = Tipos_1.TipoDato.DECIMAL;
                valorPredeterminado = 0.0;
                break;
            case "bool":
                tipoDominante = Tipos_1.TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipoDominante = Tipos_1.TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipoDominante = Tipos_1.TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                throw new Error(`Tipo ${this.tipo} no permitido para la declaración de vectores`);
        }
        // Calcular el tamaño del vector
        const exp1Resultado = this.exp1.calcular(entorno);
        if (this.exp2 != null) {
            const exp2Resultado = this.exp2.calcular(entorno);
            // Verifica que las posiciones sean de tipo entero
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO || exp2Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                throw new Error("La posición del vector debe ser de tipo entero");
            }
            // Guarda el vector en el entorno con dos dimensiones
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, exp2Resultado.valor, this.linea, this.columna);
        }
        else {
            // Verifica que la posición sea de tipo entero
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                throw new Error("La posición del vector debe ser de tipo entero");
            }
            // Guarda el vector en el entorno con una dimensión
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, 1, this.linea, this.columna);
        }
        // Inicializa los valores predeterminados del vector
        (_a = entorno.obtenerArreglo(this.id[0])) === null || _a === void 0 ? void 0 : _a.inicializarValoresPredeterminados("Vector", tipoDominante, valorPredeterminado, this.linea, this.columna);
    }
}
exports.Vector1 = Vector1;
