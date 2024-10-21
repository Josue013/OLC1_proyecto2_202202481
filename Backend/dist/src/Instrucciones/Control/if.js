"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fn_if = void 0;
const Tipos_1 = require("../../Expresiones/Tipos");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Continue_1 = require("../Continue");
const Errores_1 = require("../../Error/Errores_");
const Errores_2 = require("../../Error/Errores_");
const AST_1 = require("../../AST/AST");
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
    getAST(anterior) {
        return "";
    }
}
exports.Fn_if = Fn_if;
