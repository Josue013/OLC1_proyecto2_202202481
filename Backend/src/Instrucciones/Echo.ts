import { imprimir } from "../AST/AST";
import Contador from "../Entorno/Contador";
import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";

export class Echo extends Instruccion{

    constructor(private exp:Expresion,linea:number,columna:number){
        super(linea,columna)
    }

    public ejecutar(entorno:Entorno) {
        console.log("")
        console.log("======== Ejecutando echo ==========")
        const exp1 = this.exp.calcular(entorno);
        console.log(exp1)
        imprimir(exp1.valor)
        console.log("===================================")
    }


    /*echo expresion */
    /*echo expresion */
    public getAST(anterior: string): string {
        let ast = "";
        let counter = Contador.getInstancia();
        let echoNode = `n${counter.get()}`;
        let expNode = `n${counter.get()}`;

        ast += `${echoNode}[label="echo"];\n`;
        ast += `${anterior} -> ${echoNode};\n`;

        ast += `${expNode}[label="expresion"];\n`;
        ast += `${echoNode} -> ${expNode};\n`;

        ast += this.exp.getAST(expNode);

        return ast;
    }

}