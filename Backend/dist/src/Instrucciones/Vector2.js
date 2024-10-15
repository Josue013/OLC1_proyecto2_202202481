"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector2 = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Expresion_1 = require("../Expresiones/Expresion");
const Instruccion_1 = require("./Instruccion");
class Vector2 extends Instruccion_1.Instruccion {
    constructor(id, tipo, valor, line, column, bandera) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.valor = valor;
        this.bandera = bandera;
    }
    ejecutar(entorno) {
        var _a, _b, _c, _d, _e;
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
        // Guardar el vector en el entorno
        if (this.bandera && !(this.valor instanceof Expresion_1.Expresion)) {
            // caso para vectores unidimensionales
            if (!(this.valor[0] instanceof Array)) {
                const maxColumnas = 1;
                const maxFilas = this.valor.length;
                // Guardar el vector en el entorno
                entorno.guardarArreglo(this.id[0], tipoDominante, maxFilas, maxColumnas, this.linea, this.columna);
                // Inicializar con valores predeterminados
                (_a = entorno.obtenerArreglo(this.id[0])) === null || _a === void 0 ? void 0 : _a.inicializarValoresPredeterminados(this.id[0], tipoDominante, valorPredeterminado, this.linea, this.columna);
                // Asignar valores al vector
                for (let i = 0; i < this.valor.length; i++) {
                    const expresion = this.valor[i];
                    const valor = expresion.calcular(entorno);
                    if (valor.tipoDato == tipoDominante) {
                        (_b = entorno.obtenerArreglo(this.id[0])) === null || _b === void 0 ? void 0 : _b.asignarValor(i, 0, this.id[0], tipoDominante, valor.valor, this.linea, this.columna);
                    }
                    else {
                        throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
                    }
                }
            }
            else {
                throw new Error(`El vector ${this.id} no puede ser de dos dimensiones`);
            }
        }
        else if (!(this.valor instanceof Expresion_1.Expresion)) {
            // Caso para vectores bidimensionales
            if (this.valor[0] instanceof Array) {
                const maxFilas = this.valor.length;
                const maxColumnas = Math.max(...this.valor.map(columnas => columnas instanceof Array ? columnas.length : 0));
                // Guardar el vector en el entorno
                entorno.guardarArreglo(this.id[0], tipoDominante, maxFilas, maxColumnas, this.linea, this.columna);
                // Inicializar con valores predeterminados
                (_c = entorno.obtenerArreglo(this.id[0])) === null || _c === void 0 ? void 0 : _c.inicializarValoresPredeterminados(this.id[0], tipoDominante, valorPredeterminado, this.linea, this.columna);
                // Asignar valores al vector
                for (let i = 0; i < this.valor.length; i++) {
                    const columnas = this.valor[i];
                    for (let j = 0; j < columnas.length; j++) {
                        const expresion = columnas[j];
                        const valor = expresion.calcular(entorno);
                        if (valor.tipoDato == tipoDominante) {
                            (_d = entorno.obtenerArreglo(this.id[0])) === null || _d === void 0 ? void 0 : _d.asignarValor(i, j, this.id[0], tipoDominante, valor.valor, this.linea, this.columna);
                        }
                        else {
                            throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
                        }
                    }
                }
            }
        }
        else {
            // Caso para expresiones
            const expresion = this.valor.calcular(entorno);
            const aux = expresion.valor;
            // Guardar el vector en el entorno
            entorno.guardarArreglo(this.id[0], tipoDominante, aux.length, 1, this.linea, this.columna);
            // Asignar valores al vector
            for (let i = 0; i < aux.length; i++) {
                const valor = aux[i].calcular(entorno);
                if (valor.tipoDato == tipoDominante) {
                    (_e = entorno.obtenerArreglo(this.id[0])) === null || _e === void 0 ? void 0 : _e.asignarValor(i, 0, this.id[0], tipoDominante, valor.valor, this.linea, this.columna);
                }
                else {
                    throw new Error(`Tipo de dato ${valor.tipoDato} no asignable a ${tipoDominante}`);
                }
            }
        }
    }
}
exports.Vector2 = Vector2;
