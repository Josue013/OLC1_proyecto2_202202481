import { getDataTypeName, Resultado, TipoDato } from "../Expresiones/Tipos";
import { Simbolo } from "./Simbolo";
import { Arreglo } from "./arreglos";
import { Funcion } from "../Instrucciones/Funcion";
import { TablaSimbolos } from "../Error/TablaSimbolos";
import { simbolos } from "../AST/AST";

export class Entorno {
    public variables: Map<string, Simbolo>;
    public arreglos: Map<string, Arreglo>;
    public funciones: Map<string, Funcion>;

    constructor(public entornoPadre: Entorno | null) {
        
        this.variables = new Map();
        this.arreglos = new Map();
        this.funciones = new Map();
    }

    // imprimir arreglos en el map
    public imprimirArreglos(): void {
        console.log("============= IMPRIMIENDO ARREGLOS =============");
        this.arreglos.forEach((arreglo, key) => {
            console.log(key, arreglo.valor);
        });
        console.log("===============================================");
    }

    // imprimir funciones en el map
    public imprimirFunciones(): void {
        console.log("============= IMPRIMIENDO FUNCIONES =============");
        this.funciones.forEach((funcion, key) => {
            console.log(key, funcion);
        });
        console.log("===============================================");
    }

    // guardar variable
    guardarVariable(id:string, valor:Resultado, tipoDato:TipoDato, esConstante: boolean, linea:number,columna:number){
        
        let entorno: Entorno | null = this;
        if (entorno.variables.has(id)) {
            throw Error("Esta variable ya existe")
        } else if (entorno.arreglos.has(id)) {
            throw Error("Este ID es un arreglo")
        } else if (entorno.funciones.has(id)) {
            throw Error("Este ID es una función")
        }
        const simbolo = new Simbolo(id,valor,tipoDato,esConstante,linea,columna)
        this.variables.set(id,simbolo)

        let nuevoSimbolo = new TablaSimbolos(simbolos.length + 1, id, getDataTypeName(tipoDato), "Variable", linea, columna);

        let aux = simbolos.some((element) => element.tipo === nuevoSimbolo.tipo && element.tipo2 === nuevoSimbolo.tipo2 && element.linea === nuevoSimbolo.linea && element.columna === nuevoSimbolo.columna);

        if(!aux){
            simbolos.push(nuevoSimbolo);
        }

    }

    // actualizar variable
    actualiarVariable(id: string, valor: Resultado) {
        if (!this.variables.has(id)) 
            throw new Error("Esta variable no existe");
        const variable = this.variables.get(id);
        variable?.setValor(valor);
    }
    
    public actualizarSimbolo(id:string,valor:Simbolo){
        this.variables.set(id,valor);
    }


    // obtener variable
    obtenerVariable(id: string): Simbolo | null | undefined {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.variables.has(id)) {
                return entorno.variables.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return null;
    }

    // obtener arreglo
    obtenerArreglo(id: string): Arreglo | null | undefined {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.arreglos.has(id)) {
                return entorno.arreglos.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return null;
    }

    // guardar arreglo
    guardarArreglo(id: string, tipo: TipoDato, filas: number, columnas: number, linea: number, columna: number) {
        if (this.arreglos.has(id)) {
            throw new Error("Este arreglo ya existe");
        } else if (this.variables.has(id)) {
            throw new Error("Este ID es una variable");
        } else if (this.funciones.has(id)) {
            throw new Error("Este ID es una función");
        }

        let arreglo = new Arreglo(id, tipo, filas, columnas, linea, columna);
        this.arreglos.set(id, arreglo);

        let nuevoSimbolo = new TablaSimbolos(simbolos.length + 1, id, getDataTypeName(tipo), "Vector", linea, columna);

        let aux = simbolos.some((element) => element.tipo === nuevoSimbolo.tipo && element.tipo2 === nuevoSimbolo.tipo2 && element.linea === nuevoSimbolo.linea && element.columna === nuevoSimbolo.columna);

        if(!aux){
            simbolos.push(nuevoSimbolo);
        }

    }

    // actualizar arreglo
    actualizarArreglo(id: string, arreglo: Arreglo) {
        if (!this.arreglos.has(id)) {
            throw new Error("Este arreglo no existe");
        }
        this.arreglos.set(id, arreglo);
    }


    // guardar funcion
    public guardarFuncion(id: string, funcion: Funcion) {
        let entorno: Entorno | null = this;
        if (entorno.funciones.has(id)) {
            throw new Error("Esta función ya existe");
        } else if (entorno.variables.has(id)) {
            throw new Error("Este ID es una variable");
        } else if (entorno.arreglos.has(id)) {
            throw new Error("Este ID es un arreglo");
        }
        this.funciones.set(id, funcion);

        let nuevoSimbolo = new TablaSimbolos(simbolos.length + 1, id, getDataTypeName(funcion.tipoDato), "Funcion", funcion.linea, funcion.columna);

        let aux = simbolos.some((element) => element.tipo === nuevoSimbolo.tipo && element.tipo2 === nuevoSimbolo.tipo2 && element.linea === nuevoSimbolo.linea && element.columna === nuevoSimbolo.columna);

        if(!aux){
            simbolos.push(nuevoSimbolo);
        }

    }

    // obtener funcion
    public obtenerFuncion(id: string): Funcion | undefined {
        let entorno: Entorno | null = this;
        while (entorno != null) {
            if (entorno.funciones.has(id)) {
                return entorno.funciones.get(id);
            }
            entorno = entorno.entornoPadre;
        }
        return undefined;
    }   

    // obtener entorno global
    public obtenerEntornoGlobal(): Entorno {
        let entorno: Entorno | null = this;
        while (entorno?.entornoPadre != null) {
            entorno = entorno.entornoPadre;
        }
        return entorno;
    }



}
