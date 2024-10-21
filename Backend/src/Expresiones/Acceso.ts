import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "./Expresion";
import { Resultado, TipoDato } from "./Tipos";
import { Error_ } from "../Error/Errores_";
import { TipoError } from "../Error/Errores_";
import { agregarError } from "../AST/AST";
import Contador from "../Entorno/Contador";

export class Acceso extends Expresion{
    constructor(private id:string,linea:number,columna:number){
        super(linea,columna)
    }
    public calcular(entorno:Entorno): Resultado {

        // VARIABLES
        const value = entorno.obtenerVariable(this.id);
        if (value != null) {
            return {valor:value.getValor().valor,tipoDato:value.tipoDato}
        }

        // VECTORES
        const vector = entorno.obtenerArreglo(this.id);
        if (vector != null) {
            return {valor: vector.id, tipoDato: TipoDato.ID};
        }

        //throw new Error(`La variable o vector ${this.id} no existe`);
        throw agregarError(new Error_(`La variable o vector ${this.id} no existe`, this.linea, this.columna, TipoError.SEMANTICO));
    }

    public getAST(anterior: string): string {
        let result = "";
        let counter = Contador.getInstancia();
        let idNodeT = `n${counter.get()}`;
        let idNode = `n${counter.get()}`;
    
        result += `${idNodeT}[label="Acceso"];\n`;
        result += `${idNode}[label="${this.id}"];\n`;
        result += `${anterior} -> ${idNodeT};\n`;
        result += `${idNodeT} -> ${idNode};\n`;
    
        return result;
    }

}