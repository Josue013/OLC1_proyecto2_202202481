import { Entorno } from "../Entorno/Entorno";
import { Instruccion } from "../Instrucciones/Instruccion";

let consola = "";
export class AST {
    constructor(private instrucciones:Instruccion[]){
    }
    interpretar(){
        consola = ""; // Limpiar la consola antes de cada interpretación
        const entornoGlobal = new Entorno(null);
        for (const instruccion of this.instrucciones) {
            try {
                instruccion.ejecutar(entornoGlobal)
            } catch ( error) {
                console.error(error)    
            }
        }
        return consola; 
    }
}
export function imprimir(valor:any){
    consola += valor +"\n"
}