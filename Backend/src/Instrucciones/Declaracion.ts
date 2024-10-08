import { Entorno } from "../Entorno/Entorno";
import { Expresion } from "../Expresiones/Expresion";
import { TipoDato, Resultado } from "../Expresiones/Tipos";
import { Instruccion } from "./Instruccion";

export class Declaracion extends Instruccion {
    private tipoDato: string;
    private ids: string[];
    private exp: Expresion | null;

    constructor(tipoDato: string, ids: string | string[], exp: Expresion | null, linea: number, columna: number) {
        super(linea, columna);
        this.tipoDato = tipoDato;
        // Asegurarse de que ids sea un array
        this.ids = Array.isArray(ids) ? ids : [ids];
        this.exp = exp;
    }

    public ejecutar(entorno: Entorno) {
        let tipo: TipoDato;
        let valorPredeterminado: any;

        // Definir el tipo dominante según el tipo de dato
        switch (this.tipoDato) {
            case "int":
                tipo = TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipo = TipoDato.DECIMAL;
                valorPredeterminado = 0.0;
                break;
            case "bool":
                tipo = TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipo = TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipo = TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                throw new Error(`Tipo ${this.tipoDato} no permitido para la declaración de variables`);
        }

        // Si existe una expresión, calcular su valor
        if (this.exp != null) {
            const expResultado: Resultado = this.exp.calcular(entorno);
            // Validar que el tipo de la expresión coincida con el tipo dominante
            if (tipo != expResultado.tipoDato) {
                throw new Error(`Tipo ${expResultado.tipoDato} no asignable a ${tipo}`);
            }
            // Guardar cada variable con el valor de la expresión
            this.ids.forEach(id => {
                entorno.guardarVariable(id, expResultado, tipo, this.linea, this.columna);
            });
        } else {
            // Guardar cada variable con el valor predeterminado
            this.ids.forEach(id => {
                entorno.guardarVariable(id, { valor: valorPredeterminado, tipoDato: tipo }, tipo, this.linea, this.columna);
            });
        }
    }
}
