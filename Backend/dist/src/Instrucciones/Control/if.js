"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fn_if = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
const Contador_1 = __importDefault(require("../../Entorno/Contador"));
class Fn_if extends Instruccion_1.Instruccion {
    constructor(condicion, instruccionesV, instruccionesF, elseif) {
        super(0, 0);
        this.condicion = condicion;
        this.instruccionesV = instruccionesV;
        this.instruccionesF = instruccionesF;
        this.elseif = elseif;
    }
    ejecutar(entorno) {
        const condicion = this.condicion.calcular(entorno);
        if (condicion.tipoDato != Tipos_1.TipoDato.BOOLEANO)
            throw (0, AST_1.agregarError)(new Errores_1.Error_("La condición no es booleana", this.linea, this.columna, Errores_2.TipoError.SEMANTICO));
        if (condicion.valor) {
            const transfer = this.instruccionesV.ejecutar(entorno);
            if (transfer instanceof Break_1.Break)
                return transfer;
            if (transfer instanceof Continue_1.Continue)
                return transfer;
            if (transfer.typeValue == 'return')
                return transfer;
        }
        else {
            if (this.instruccionesF != null) { // Else
                const transfer = this.instruccionesF.ejecutar(entorno);
                if (transfer instanceof Break_1.Break)
                    return transfer;
                if (transfer instanceof Continue_1.Continue)
                    return transfer;
                if (transfer.typeValue == 'return')
                    return transfer;
            }
            else if (this.elseif != null) { // Caso Elseif
                const transfer = this.elseif.ejecutar(entorno);
                if (transfer instanceof Break_1.Break)
                    return transfer;
                if (transfer instanceof Continue_1.Continue)
                    return transfer;
                if (transfer.typeValue == 'return')
                    return transfer;
            }
        }
    }
    /*
    
    if ( <EXPRESION> ) { <INSTRUCCIONES> }
    |
    if ( <EXPRESION> ) { <INSTRUCCIONES> } else {
    <INSTRUCCIONES> }
    |
    if ( <EXPRESION> ) { <INSTRUCCIONES> } else <IF>

    Son 3 variantes en total
    1. IF
    2. IF-ELSE
    3. IF-ELSE IF
    */
    getAST(anterior) {
        let result = "";
        let counter = Contador_1.default.getInstancia();
        let ifNode = `n${counter.get()}`;
        let condNode = `n${counter.get()}`;
        let trueBlockNode = `n${counter.get()}`;
        let falseBlockNode = `n${counter.get()}`;
        let elseIfNode = `n${counter.get()}`;
        result += `${ifNode}[label="IF"];\n`;
        result += `${condNode}[label="Condicion"];\n`;
        result += `${trueBlockNode}[label="Instrucciones Verdaderas"];\n`;
        result += `${anterior} -> ${ifNode};\n`;
        result += `${ifNode} -> ${condNode};\n`;
        result += this.condicion.getAST(condNode);
        result += `${ifNode} -> ${trueBlockNode};\n`;
        result += this.instruccionesV.getAST(trueBlockNode);
        if (this.instruccionesF != null) {
            result += `${falseBlockNode}[label="Instrucciones Falsas"];\n`;
            result += `${ifNode} -> ${falseBlockNode};\n`;
            result += this.instruccionesF.getAST(falseBlockNode);
        }
        else if (this.elseif != null) {
            result += `${elseIfNode}[label="Else If"];\n`;
            result += `${ifNode} -> ${elseIfNode};\n`;
            result += this.elseif.getAST(elseIfNode);
        }
        return result;
    }
}
exports.Fn_if = Fn_if;
