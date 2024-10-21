"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperadorLogico = exports.Logico = void 0;
const Expresion_1 = require("./Expresion");
const Tipos_1 = require("./Tipos");
const Errores_1 = require("../Error/Errores_");
const Errores_2 = require("../Error/Errores_");
const AST_1 = require("../AST/AST");
const Contador_1 = __importDefault(require("../Entorno/Contador"));
class Logico extends Expresion_1.Expresion {
    constructor(exp1, exp2, operador, linea, columna) {
        super(linea, columna);
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.operador = operador;
    }
    calcular(entorno) {
        const resultado1 = this.exp1.calcular(entorno);
        // NOT
        if (this.operador === OperadorLogico.NOT) {
            if (resultado1.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
                //throw new Error("El tipo de dato no es booleano");
                throw (0, AST_1.agregarError)(new Errores_1.Error_("El tipo de dato no es booleano", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
            }
            return { valor: !resultado1.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        }
        if (this.exp2 === null) {
            //throw new Error("La segunda expresión no puede ser nula para operadores AND y OR");
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La segunda expresión no puede ser nula para operadores AND y OR", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        const resultado2 = this.exp2.calcular(entorno);
        if (resultado1.tipoDato !== Tipos_1.TipoDato.BOOLEANO || resultado2.tipoDato !== Tipos_1.TipoDato.BOOLEANO) {
            //throw new Error("El tipo de dato no es booleano");
            throw (0, AST_1.agregarError)(new Errores_1.Error_("El tipo de dato no es booleano", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        }
        // AND
        if (this.operador === OperadorLogico.AND) {
            return { valor: resultado1.valor && resultado2.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        }
        // OR
        if (this.operador === OperadorLogico.OR) {
            return { valor: resultado1.valor || resultado2.valor, tipoDato: Tipos_1.TipoDato.BOOLEANO };
        }
        throw (0, AST_1.agregarError)(new Errores_1.Error_("Operador lógico no reconocido", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
    }
    /*  EXPRESION OPERADOR EXPRESION  */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let logicoNode = `n${counter.get()}`;
        let exp1Node = `n${counter.get()}`;
        let operadorNode = `n${counter.get()}`;
        let exp2Node = `n${counter.get()}`;
        result += `${logicoNode}[label="Operador Logico"];\n`;
        result += `${exp1Node}[label="Expresion"];\n`;
        result += `${operadorNode}[label="${this.getOperador()}"];\n`;
        result += `${exp2Node}[label="Expresion"];\n`;
        result += `${anterior} -> ${logicoNode};\n`;
        result += `${logicoNode} -> ${exp1Node};\n`;
        result += this.exp1.getAST(exp1Node);
        result += `${logicoNode} -> ${operadorNode};\n`;
        if (this.exp2 != null) {
            result += `${logicoNode} -> ${exp2Node};\n`;
            result += this.exp2.getAST(exp2Node);
        }
        return result;
    }
    getOperador() {
        switch (this.operador) {
            case OperadorLogico.AND:
                return "&&";
            case OperadorLogico.OR:
                return "||";
            case OperadorLogico.NOT:
                return "!";
            default:
                return "";
        }
    }
}
exports.Logico = Logico;
var OperadorLogico;
(function (OperadorLogico) {
    OperadorLogico[OperadorLogico["AND"] = 0] = "AND";
    OperadorLogico[OperadorLogico["OR"] = 1] = "OR";
    OperadorLogico[OperadorLogico["NOT"] = 2] = "NOT";
})(OperadorLogico || (exports.OperadorLogico = OperadorLogico = {}));
