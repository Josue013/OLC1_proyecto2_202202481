"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const Errores_1 = require("../Error/Errores_");
const Listas_1 = require("../Listas/Listas");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(tipoDato, ids, exp, esConstante, linea, columna) {
        super(linea, columna);
        this.tipoDato = tipoDato;
        // Asegurarse de que ids sea un array
        this.ids = Array.isArray(ids) ? ids : [ids];
        this.exp = exp;
        this.esConstante = esConstante;
    }
    ejecutar(entorno) {
        let tipo;
        let valorPredeterminado;
        // Definir el tipo dominante según el tipo de dato
        switch (this.tipoDato) {
            case "int":
                tipo = Tipos_1.TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipo = Tipos_1.TipoDato.DECIMAL;
                valorPredeterminado = 0.0;
                break;
            case "bool":
                tipo = Tipos_1.TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipo = Tipos_1.TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipo = Tipos_1.TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                throw Listas_1.tablaError.push(new Errores_1.Error_(`${this.tipoDato}, no se permite en la declaración de variables`, this.linea, this.columna, Errores_1.TipoError.SEMANTICO));
        }
        // Si existe una expresión, calcular su valor
        if (this.exp != null) {
            const expResultado = this.exp.calcular(entorno);
            const valor = this.exp.calcular(entorno);
            // Validar que el tipo de la expresión coincida con el tipo dominante
            if (tipo != valor.tipoDato) {
                throw new Error(`Tipo ${valor.tipoDato} no asignable a ${tipo}`);
            }
            // Guardar cada variable con el valor de la expresión
            this.ids.forEach(id => {
                entorno.guardarVariable(id, valor, tipo, this.esConstante, this.linea, this.columna);
            });
        }
        else {
            // Guardar cada variable con el valor predeterminado
            this.ids.forEach(id => {
                entorno.guardarVariable(id, { valor: valorPredeterminado, tipoDato: tipo }, tipo, this.esConstante, this.linea, this.columna);
            });
        }
    }
}
exports.Declaracion = Declaracion;
