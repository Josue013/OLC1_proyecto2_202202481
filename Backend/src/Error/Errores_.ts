export class Error_ {
  public descripcion:string;
  public linea:number;
  public columna:number;
  public tipo:TipoError;

  constructor(descripcion:string,linea:number,columna:number,tipo:TipoError){
      this.columna= columna;
      this.descripcion= descripcion;
      this.linea=linea;
      this.tipo= tipo;
  }

  toString(){
      return `Error ${this.tipo}: ${this.descripcion} en linea: ${this.linea} y columna: ${this.columna}`
  }
}

export enum TipoError {
  LEXICO = "Lexico",
  SINTACTICO = "Sintactico",
  SEMANTICO = "Semantico"
}
