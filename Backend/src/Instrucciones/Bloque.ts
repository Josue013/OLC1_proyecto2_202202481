import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "./Instruccion";

export class Bloque extends Instruccion{
    constructor(private instrucciones:[Instruccion],linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(entorno: Entorno) {
        const nuevoEntorno = new Entorno(entorno);
        this.instrucciones.forEach(element => {
           element.ejecutar(nuevoEntorno);
        });
    }
}
