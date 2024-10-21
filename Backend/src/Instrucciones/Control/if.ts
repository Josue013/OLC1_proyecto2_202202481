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
import Contador from "../../Entorno/Contador";

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


    

    public getAST(anterior: string): string {
        let result = "";
        let counter = Contador.getInstancia();
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
        } else if (this.elseif != null) {
            result += `${elseIfNode}[label="Else If"];\n`;
            result += `${ifNode} -> ${elseIfNode};\n`;
            result += this.elseif.getAST(elseIfNode);
        }

        return result;
    }

}