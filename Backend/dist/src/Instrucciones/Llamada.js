"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Llamada = void 0;
const Tipos_1 = require("../Expresiones/Tipos");
const Instruccion_1 = require("./Instruccion");
const Entorno_1 = require("../Entorno/Entorno");
const Break_1 = require("./Break");
const Continue_1 = require("./Continue");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Llamada extends Instruccion_1.Instruccion {
    constructor(id, parametros, bandera, line, column) {
        super(line, column);
        this.id = id;
        this.parametros = parametros;
        this.bandera = bandera;
    }
    ejecutar(entorno) {
        var _a;
        // obtener la función del entorno
        const funcion = entorno.obtenerFuncion(this.id);
        //entorno.imprimirFunciones();
        // Verificar si la función existe en el entorno
        if (!funcion) {
            //throw new Error(`La función ${this.id} no está definida ni en el entorno local ni en el global.`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`La función ${this.id} no está definida ni en el entorno local ni en el global.`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // Obtener los parámetros de la función
        const parametros = funcion.parametros;
        const totalParametros = parametros.length;
        const totalParametrosLlamada = this.parametros.length;
        // Verificar que la cantidad de argumentos sea válida
        if (totalParametrosLlamada > totalParametros) {
            //throw new Error(`La función ${this.id} esperaba ${totalParametros} parámetros, pero se recibieron ${totalParametrosLlamada}.`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`La función ${this.id} esperaba ${totalParametros} parámetros, pero se recibieron ${totalParametrosLlamada}.`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // Crear un nuevo entorno para la función con el entorno actual como padre
        const newEnv = new Entorno_1.Entorno(entorno.obtenerEntornoGlobal());
        // Declarar y reasignar parámetros
        for (let i = 0; i < totalParametros; i++) {
            const parametro = parametros[i];
            const argumento = i < totalParametrosLlamada ? this.parametros[i].exp.calcular(entorno) : (_a = parametro.exp) === null || _a === void 0 ? void 0 : _a.calcular(entorno);
            if (argumento === undefined) {
                //throw new Error(`El parámetro ${parametro.id} no tiene un valor asignado en la llamada a la función ${this.id}.`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`El parámetro ${parametro.id} no tiene un valor asignado en la llamada a la función ${this.id}.`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            // Guardar el valor del parámetro en el nuevo entorno
            newEnv.guardarVariable(parametro.id, argumento, argumento.tipoDato, false, this.linea, this.columna);
        }
        // Obtener el bloque de instrucciones de la función
        const instrucciones = funcion.instrucciones;
        //console.log(instrucciones);
        // Ejecutar el cuerpo de la función en el nuevo entorno
        const transfer = instrucciones.ejecutar(newEnv);
        //console.log("=========================================");
        //console.log("Retorno de la función: " + this.id);
        //console.log(transfer);
        //console.log("=========================================");
        if (transfer != null) {
            if ((transfer === null || transfer === void 0 ? void 0 : transfer.typeValue) == 'return') {
                if (funcion.tipoDato === transfer.type || (funcion.tipoDato === Tipos_1.TipoDato.NULO && transfer.value === null)) {
                    return {
                        value: transfer.value,
                        type: funcion.tipoDato
                    };
                }
                else {
                    //throw new Error(`El tipo de dato de retorno de la función ${this.id} no coincide con el tipo de dato esperado`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`El tipo de dato de retorno de la función ${this.id} no coincide con el tipo de dato esperado`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
            }
            else if (transfer instanceof Break_1.Break || transfer instanceof Continue_1.Continue) {
                //throw new Error(`Instrucción ${transfer.constructor.name} no permitida fuera de un ciclo`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Instrucción ${transfer.constructor.name} no permitida fuera de un ciclo`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
        }
        if (funcion.tipoDato === Tipos_1.TipoDato.NULO) {
            return null;
        }
        else {
            //throw new Error(`Tipo de retorno ${transfer.type} esperado en la función ${this.id}`);
            throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo de retorno ${transfer.type} esperado en la función ${this.id}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
    }
    calcular(entorno) {
        let resultado = this.ejecutar(entorno);
        return { valor: resultado.value, tipoDato: resultado.type };
    }
    /* ID ( PARAMETROS ) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let functionNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        result += `${functionNode}[label="${this.id}"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${anterior} -> ${functionNode};\n`;
        result += `${anterior} -> ${lParenNode};\n`;
        if (this.parametros.length != 0) {
            let first = `n${counter.get()}`;
            result += `${first}[label="parametro"];\n`;
            result += `${anterior} -> ${first};\n`;
            result += this.parametros[0].exp.getAST(first);
            for (let i = 1; i < this.parametros.length; i++) {
                if (i < this.parametros.length) {
                    let comma = `n${counter.get()}`;
                    result += `${comma}[label=","];\n`;
                    result += `${anterior} -> ${comma};\n`;
                }
                let param = `n${counter.get()}`;
                result += `${param}[label="parametro"];\n`;
                result += `${anterior} -> ${param};\n`;
                result += this.parametros[i].exp.getAST(param);
            }
        }
        let rParenNode = `n${counter.get()}`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Llamada = Llamada;
