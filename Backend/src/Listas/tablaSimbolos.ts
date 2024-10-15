export class tablaSimbolos {

  public num:number;
  public id:string;
  public tipo:string;
  public ticpo2:string;
  public valor: string;
  public linea:number;
  public columna:number;

  constructor( num:number,  id: string,  tipo: string,  ticpo2: string, valor: string, linea: number,  columna: number){
    this.num = num;
    this.id = id;
    this.tipo = tipo;
    this.ticpo2 = ticpo2;
    this.valor = valor;
    this.linea = linea;
    this.columna = columna;
  }
}