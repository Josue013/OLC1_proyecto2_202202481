"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Ternario extends Expresion_1.Expresion {
    constructor(condicion, instruccionV, instruccionF, linea, columna) {
        super(linea, columna);
        this.condicion = condicion;
        this.instruccionV = instruccionV;
        this.instruccionF = instruccionF;
    }
    calcular(entorno) {
        const condicion = this.condicion.calcular(entorno); // Calcula el valor de la condición
        // Verifica que el tipo de dato de la condición sea booleano
        if (condicion.tipoDato != Tipos_1.TipoDato.BOOLEANO) {
            //throw new Error("La condición no es booleana");
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // Si la condición es verdadera, calcula y retorna el valor de instruccionV
        if (condicion.valor) {
            //console.log("Condición verdadera");
            let verdadero = this.instruccionV.calcular(entorno);
            //console.log(verdadero);
            return verdadero;
        }
        else {
            // Si la condición es falsa, calcula y retorna el valor de instruccionF
            //console.log("Condición falsa");
            let falso = this.instruccionF.calcular(entorno);
            //console.log(falso);
            return falso;
        }
    }
    /* IF ( CONDICION ) EXPRESION : EXPRESION */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let ternarioNode = `n${counter.get()}`;
        let ifNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let condicionNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        let expVNode = `n${counter.get()}`;
        let colonNode = `n${counter.get()}`;
        let expFNode = `n${counter.get()}`;
        result += `${ternarioNode}[label="Operador Ternario"];\n`;
        result += `${ifNode}[label="if"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${condicionNode}[label="Condicion"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${expVNode}[label="Expresion Verdadera"];\n`;
        result += `${colonNode}[label=":"];\n`;
        result += `${expFNode}[label="Expresion Falsa"];\n`;
        result += `${anterior} -> ${ternarioNode};\n`;
        result += `${ternarioNode} -> ${ifNode};\n`;
        result += `${ternarioNode} -> ${lParenNode};\n`;
        result += `${ternarioNode} -> ${condicionNode};\n`;
        result += this.condicion.getAST(condicionNode);
        result += `${ternarioNode} -> ${rParenNode};\n`;
        result += `${ternarioNode} -> ${expVNode};\n`;
        result += this.instruccionV.getAST(expVNode);
        result += `${ternarioNode} -> ${colonNode};\n`;
        result += `${ternarioNode} -> ${expFNode};\n`;
        result += this.instruccionF.getAST(expFNode);
        return result;
    }
}
exports.Ternario = Ternario;
