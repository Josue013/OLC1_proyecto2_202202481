"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion = void 0;
const Instruccion_1 = require("./Instruccion");
const Tipos_1 = require("../Expresiones/Tipos");
const AST_1 = require("../AST/AST");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Asignacion extends Instruccion_1.Instruccion {
    constructor(id, expresion, linea, columna) {
        super(linea, columna);
        this.id = id;
        this.expresion = expresion;
    }
    ejecutar(entorno) {
        var _a;
        const simbolo = entorno.obtenerVariable(this.id); // Obtiene la variable del entorno
        if (simbolo) {
            // Verifica si la variable es constante
            if (simbolo.esConstante) {
                //throw new Error(`La variable ${this.id} es una constante y no puede ser reasignada`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable ${this.id} es una constante y no puede ser reasignada`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            const nuevoValor = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
            // Verifica que el tipo de dato coincida
            if (nuevoValor.tipoDato !== simbolo.obtenertipoDato()) {
                //throw new Error(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${nuevoValor.tipoDato} no es asignable a ${simbolo.obtenertipoDato()}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            simbolo.setValor(nuevoValor); // Asigna el nuevo valor a la variable
            simbolo.actualizarValor(nuevoValor); // Actualiza el valor de la variable en el entorno
            //console.log(`Asignación de ${this.id} con valor ${nuevoValor.valor}`);
        }
        else {
            const vector = entorno.obtenerArreglo(this.id); // Obtiene el vector del entorno
            if (vector) {
                const nuevoValor = this.expresion.calcular(entorno); // Calcula el nuevo valor de la expresión
                const vector2 = entorno.obtenerArreglo(nuevoValor.valor); // Obtiene el vector a asignar
                if (!vector2) {
                    //throw new Error(`Vector ${nuevoValor.valor} no existe`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Vector ${nuevoValor.valor} no existe`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                // Verifica que los tipos de datos coincidan
                if (vector.tipo != Tipos_1.TipoDato.ID) {
                    //throw new Error(`El tipo de dato del vector ${TipoDato.ID} no coincide con el tipo de dato del vector ${nuevoValor.valor}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`El tipo de dato del vector ${Tipos_1.TipoDato.ID} no coincide con el tipo de dato del vector ${nuevoValor.valor}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                // Verifica que las dimensiones de los vectores coincidan
                if (vector.valor.length !== vector2.valor.length || vector.valor[0].length !== vector2.valor[0].length) {
                    //throw new Error(`Vector ${vector2.id} no tiene las mismas dimensiones que ${vector.id}`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Vector ${vector2.id} no tiene las mismas dimensiones que ${vector.id}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                (_a = entorno.obtenerArreglo(this.id)) === null || _a === void 0 ? void 0 : _a.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el entorno
                vector.establecerArreglo(vector2.valor); // Establece el nuevo arreglo en el vector
                entorno.actualizarArreglo(this.id, vector); // Actualiza el vector en el entorno
                //console.log(`Asignación de vector ${this.id} con valores del vector ${nuevoValor.valor}`);
            }
            else {
                //throw new Error(`La variable o vector ${this.id} no existe`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable o vector ${this.id} no existe`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
    }
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let assignNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let assignNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let semicolonNode = `n${counter.get()}`;
        result += `${assignNodeT}[label="I_Asignacion"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${assignNode}[label="="];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${anterior} -> ${assignNodeT};\n`;
        result += `${assignNodeT} -> ${idNode};\n`;
        result += `${assignNodeT} -> ${assignNode};\n`;
        result += `${assignNodeT} -> ${expNode};\n`;
        result += this.expresion.getAST(expNode);
        result += `${assignNodeT} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.Asignacion = Asignacion;
