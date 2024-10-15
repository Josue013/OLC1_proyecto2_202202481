import { Resultado, TipoDato } from "../Expresiones/Tipos";
import { Expresion } from "../Expresiones/Expresion";
import { Instruccion } from "./Instruccion";
import { Entorno } from "../Entorno/Entorno";

export class Vector1 extends Instruccion {
    public id: string[]; // Identificadores del vector
    public tipo: string; // Tipo de dato del vector
    public tipo2: string; // Tipo de dato secundario para verificación
    public exp1: Expresion; // Expresión que define el tamaño del vector
    public exp2: Expresion | null; // Expresión opcional para definir una segunda dimensión del vector

    constructor(id: string[], tipo: string, tipo2: string, exp1: Expresion, exp2: Expresion | null, line: number, column: number) {
        super(line, column);
        this.id = id;
        this.tipo = tipo;
        this.tipo2 = tipo2;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    public ejecutar(entorno: Entorno): void {
        // Verifica que los tipos coincidan
        if (this.tipo2 !== this.tipo) {
            throw new Error(`Tipo ${this.tipo2} no coincide con ${this.tipo}`);
        }

        let tipoDominante: TipoDato;
        let valorPredeterminado: any;

        // Definir el tipo dominante según el tipo de dato
        switch (this.tipo) {
            case "int":
                tipoDominante = TipoDato.ENTERO;
                valorPredeterminado = 0;
                break;
            case "double":
                tipoDominante = TipoDato.DECIMAL;
                valorPredeterminado = 0.0;
                break;
            case "bool":
                tipoDominante = TipoDato.BOOLEANO;
                valorPredeterminado = true;
                break;
            case "char":
                tipoDominante = TipoDato.CHAR;
                valorPredeterminado = '0';
                break;
            case "string":
                tipoDominante = TipoDato.STRING;
                valorPredeterminado = "";
                break;
            default:
                throw new Error(`Tipo ${this.tipo} no permitido para la declaración de vectores`);
        }

        // Calcular el tamaño del vector
        const exp1Resultado = this.exp1.calcular(entorno);

        if (this.exp2 != null) {
            const exp2Resultado = this.exp2.calcular(entorno);
            // Verifica que las posiciones sean de tipo entero
            if (exp1Resultado.tipoDato != TipoDato.ENTERO || exp2Resultado.tipoDato != TipoDato.ENTERO) {
                throw new Error("La posición del vector debe ser de tipo entero");
            }
            // Guarda el vector en el entorno con dos dimensiones
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, exp2Resultado.valor, this.linea, this.columna);
        } else {
            // Verifica que la posición sea de tipo entero
            if (exp1Resultado.tipoDato != TipoDato.ENTERO) {
                throw new Error("La posición del vector debe ser de tipo entero");
            }
            // Guarda el vector en el entorno con una dimensión
            entorno.guardarArreglo(this.id[0], tipoDominante, exp1Resultado.valor, 1, this.linea, this.columna);
        }
        // Inicializa los valores predeterminados del vector
        entorno.obtenerArreglo(this.id[0])?.inicializarValoresPredeterminados("Vector", tipoDominante, valorPredeterminado, this.linea, this.columna);
    }
}