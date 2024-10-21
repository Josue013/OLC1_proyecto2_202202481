export type Resultado = {
    valor: any,
    tipoDato: TipoDato
}

export enum TipoDato{
    ENTERO, // 0
    DECIMAL, // 1
    BOOLEANO, // 2
    CHAR, // 3
    STRING, // 4
    NULO, // 5
    ID // 6
}
