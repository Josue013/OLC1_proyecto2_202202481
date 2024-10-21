"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casteo = void 0;
const Expresion_1 = require("../Expresiones/Expresion");
const Tipos_1 = require("../Expresiones/Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Casteo extends Expresion_1.Expresion {
    constructor(tipo, exp, linea, columna) {
        super(linea, columna);
        this.tipo = tipo;
        this.exp = exp;
    }
    calcular(entorno) {
        const expResultado = this.exp.calcular(entorno);
        let resultado;
        switch (this.tipo) {
            case "char":
                if (expResultado.tipoDato == Tipos_1.TipoDato.ENTERO) {
                    resultado = { valor: String.fromCharCode(expResultado.valor), tipoDato: Tipos_1.TipoDato.CHAR };
                }
                else {
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${expResultado.tipoDato} no casteable a char`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                break;
            case "string":
                if (expResultado.tipoDato == Tipos_1.TipoDato.ENTERO || expResultado.tipoDato == Tipos_1.TipoDato.DECIMAL) {
                    resultado = { valor: expResultado.valor.toString(), tipoDato: Tipos_1.TipoDato.STRING };
                }
                else {
                    //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a string`);
                    throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${expResultado.tipoDato} no casteable a string`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                break;
            case "int":
                switch (expResultado.tipoDato) {
                    case Tipos_1.TipoDato.ENTERO:
                        resultado = { valor: expResultado.valor, tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    case Tipos_1.TipoDato.DECIMAL:
                        resultado = { valor: Math.floor(expResultado.valor), tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    case Tipos_1.TipoDato.CHAR:
                        resultado = { valor: expResultado.valor.charCodeAt(0), tipoDato: Tipos_1.TipoDato.ENTERO };
                        break;
                    default:
                        //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a int`);
                        throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${expResultado.tipoDato} no casteable a int`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                break;
            case "double":
                switch (expResultado.tipoDato) {
                    case Tipos_1.TipoDato.ENTERO:
                        // Redondear a 4 decimales
                        resultado = { valor: parseFloat(expResultado.valor).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    case Tipos_1.TipoDato.DECIMAL:
                        // Redondear a 4 decimales
                        resultado = { valor: expResultado.valor.toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    case Tipos_1.TipoDato.CHAR:
                        // Redondear a 4 decimales
                        resultado = { valor: expResultado.valor.charCodeAt(0).toFixed(4), tipoDato: Tipos_1.TipoDato.DECIMAL };
                        break;
                    default:
                        //throw new Error(`Tipo ${expResultado.tipoDato} no casteable a double`);
                        throw (0, AST_1.agregarError)(new Errores_1.Error_(`Tipo ${expResultado.tipoDato} no casteable a double`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
                }
                break;
            default:
                //throw new Error(`Opción casteable no valida ${this.tipo}`);
                throw (0, AST_1.agregarError)(new Errores_1.Error_(`Opción casteable no valida ${this.tipo}`, this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        return resultado;
    }
    /* CAST ( EXPRESION AS TIPO) */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let castNode = `n${counter.get()}`;
        let castLabelNode = `n${counter.get()}`;
        let lParenNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;
        let asNode = `n${counter.get()}`;
        let typeNode = `n${counter.get()}`;
        let rParenNode = `n${counter.get()}`;
        result += `${castNode}[label="Casteo"];\n`;
        result += `${castLabelNode}[label="CAST"];\n`;
        result += `${lParenNode}[label="("];\n`;
        result += `${expNode}[label="Expresion"];\n`;
        result += `${asNode}[label="AS"];\n`;
        result += `${typeNode}[label="${this.tipo}"];\n`;
        result += `${rParenNode}[label=")"];\n`;
        result += `${anterior} -> ${castNode};\n`;
        result += `${castNode} -> ${castLabelNode};\n`;
        result += `${castNode} -> ${lParenNode};\n`;
        result += `${castNode} -> ${expNode};\n`;
        result += this.exp.getAST(expNode);
        result += `${castNode} -> ${asNode};\n`;
        result += `${castNode} -> ${typeNode};\n`;
        result += `${castNode} -> ${rParenNode};\n`;
        return result;
    }
}
exports.Casteo = Casteo;
