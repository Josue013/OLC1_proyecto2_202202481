export type Resultado = {
    valor: any,
    tipoDato: TipoDato
}

export enum TipoDato{
    ENTERO,
    DECIMAL,
    BOOLEANO,
    CHAR,
    STRING,
    NULO
}
