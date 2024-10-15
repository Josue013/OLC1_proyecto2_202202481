import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "./Instruccion";
import { Break } from "./Break";
import { Continue } from "./Continue";

export class Bloque extends Instruccion{
    constructor(private instrucciones:[Instruccion],linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(entorno: Entorno) {
        const nuevoEntorno = new Entorno(entorno);
        for (const element of this.instrucciones){
        try {
            const transfer = element.ejecutar(nuevoEntorno);
            if (transfer instanceof Break) return transfer;
            if (transfer instanceof Continue) return transfer;
        } catch (error) {
           console.log(error) 
        }
        }
    }

}
