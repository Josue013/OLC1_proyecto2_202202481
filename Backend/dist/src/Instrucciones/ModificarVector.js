"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModificarVector = void 0;
const Expresion_1 = require("../Expresiones/Expresion");
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class ModificarVector extends Instruccion_1.Instruccion {
    constructor(id, exp1, exp2, value, line, column) {
        super(line, column);
        this.id = id;
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.value = value;
    }
    ejecutar(entorno) {
        var _a, _b;
        // Obtiene el vector del entorno
        const vector = entorno.obtenerArreglo(this.id);
        // Verificar que this.value sea una instancia de Expresion
        if (!(this.value instanceof Expresion_1.Expresion)) {
            //throw new Error(`El valor proporcionado no es una expresión válida`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`El valor proporcionado no es una expresión válida`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // Calcula el valor de la expresión
        const value = this.value.calcular(entorno);
        if (vector == null) {
            //throw new Error(`La variable o vector ${this.id} no existe`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`La variable o vector ${this.id} no existe`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        if (vector.tipo != value.tipoDato) {
            //throw new Error(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`El tipo de dato del vector ${this.id} no coincide con el tipo de dato de la expresion`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // Calcula la posición en la primera dimensión
        const exp1Resultado = this.exp1.calcular(entorno);
        if (this.exp2 != null) {
            // Calcula la posición en la segunda dimensión
            const exp2Resultado = this.exp2.calcular(entorno);
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO || exp2Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                //throw new Error(`Tipo de dato no valido para la posicion del vector`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo de dato no valido para la posicion del vector`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            // Asigna el valor en la posición especificada del vector
            (_a = entorno.obtenerArreglo(this.id)) === null || _a === void 0 ? void 0 : _a.asignarValor(exp1Resultado.valor, exp2Resultado.valor, vector.id, vector.tipo, value.valor, this.linea, this.columna);
        }
        else {
            if (exp1Resultado.tipoDato != Tipos_1.TipoDato.ENTERO) {
                //throw new Error(`Tipo de dato no valido para la posicion del vector`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo de dato no valido para la posicion del vector`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            // Asigna el valor en la posición especificada del vector (unidimensional)
            (_b = entorno.obtenerArreglo(this.id)) === null || _b === void 0 ? void 0 : _b.asignarValor(exp1Resultado.valor, 0, vector.id, vector.tipo, value.valor, this.linea, this.columna);
        }
        return null;
    }
    /* ID [ EXPRESION ] = EXPRESION ( | = EXPRESION) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let modificarVectorNode = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
        let lBracketNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let rBracketNode = `n${counter.get()}`;
        let equalNode = `n${counter.get()}`;
        let valueNode = `n${counter.get()}`;
        result += `${modificarVectorNode}[label="ModificarVector"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${lBracketNode}[label="["];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${rBracketNode}[label="]"];\n`;
        result += `${equalNode}[label="="];\n`;
        result += `${valueNode}[label="Expresion"];\n`;
        result += `${anterior} -> ${modificarVectorNode};\n`;
        result += `${modificarVectorNode} -> ${idNode};\n`;
        result += `${modificarVectorNode} -> ${lBracketNode};\n`;
        result += `${modificarVectorNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${modificarVectorNode} -> ${rBracketNode};\n`;
        result += `${modificarVectorNode} -> ${equalNode};\n`;
        result += `${modificarVectorNode} -> ${valueNode};\n`;
        result += this.value.getAST(valueNode);
        if (this.exp2 != null) {
            let pipeNode = `n${counter.get()}`;
            let exp2Node = `n${counter.get()}`;
            result += `${pipeNode}[label="|"];\n`;
            result += `${exp2Node}[label="Expresion"];\n`;
            result += `${modificarVectorNode} -> ${pipeNode};\n`;
            result += `${modificarVectorNode} -> ${exp2Node};\n`;
            result += this.exp2.getAST(exp2Node);
        }
        let semicolonNode = `n${counter.get()}`;
        result += `${semicolonNode}[label=";"];\n`;
        result += `${modificarVectorNode} -> ${semicolonNode};\n`;
        return result;
    }
}
exports.ModificarVector = ModificarVector;
