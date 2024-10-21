import { Entorno } from "../../Entorno/Entorno";
import { Expresion } from "../../Expresiones/Expresion";
import { TipoDato } from "../../Expresiones/Tipos";
import { Bloque } from "../Bloque";
import { Instruccion } from "../Instruccion";
import { Break } from "../Break";
import { Continue } from "../Continue";
import { Return } from "../Return";
import { Error_ } from "../../Error/Errores_";
import { TipoError } from "../../Error/Errores_";
import { agregarError } from "../../AST/AST";

export class Fn_if extends Instruccion {
    constructor(
        private condicion: Expresion,
        private instruccionesV: Bloque,
        private instruccionesF: Bloque | null,
        private elseif: Fn_if | null
    ) {
        super(0, 0);
    }

    public ejecutar(entorno: Entorno): any {
        const condicion = this.condicion.calcular(entorno);
        if (condicion.tipoDato != TipoDato.BOOLEANO)
            throw agregarError(new Error_("La condición no es booleana", this.linea, this.columna, TipoError.SEMANTICO));

        if (condicion.valor) {
            const transfer =  this.instruccionesV.ejecutar(entorno);

            if (transfer instanceof Break) return transfer;
            if (transfer instanceof Continue) return transfer;
            if (transfer.typeValue == 'return') return transfer;
        } else {
            if (this.instruccionesF != null) { // Else
                const transfer = this.instruccionesF.ejecutar(entorno)

                if (transfer instanceof Break) return transfer;
                if (transfer instanceof Continue) return transfer;
                if (transfer.typeValue == 'return') return transfer;
            } else if (this.elseif != null) { // Caso Elseif
                const transfer = this.elseif.ejecutar(entorno);

                if (transfer instanceof Break) return transfer;
                if (transfer instanceof Continue) return transfer;
                if (transfer.typeValue == 'return') return transfer;
            }
        }
    }

    public getAST(anterior: string): string {
        return "";
    }

}