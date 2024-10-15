import { tablaError } from "../Listas/Listas";
import { Error_ } from "../Error/Errores_";

export class Reportes {

  

  constructor(public tablaErrores:Error_[]){
    this.tablaErrores = tablaErrores;
}

  public generarReporteHTML(){
    let text = `<table border="1" cellspacing="0" cellpadding="5" style="border-collapse: collapse; width: 100%;">`;
    text += `<caption>Tabla de Errores</caption>`;
    text += `<tr style="background-color: #f2f2f2;"><th>ID</th><th>Type</th><th>Message</th><th>Line</th><th>Column</th></tr>`;
    for (let index = 0; index < this.tablaErrores.length; index++) {
        let error = this.tablaErrores[index];
        let rowColor = index % 2 === 0 ? '#f2f2f2' : '#ffffff';
        text += `<tr style="background-color: ${rowColor};"><td>${error.tipo}</td><td>${error.descripcion}</td><td>${error.linea}</td><td>${error.columna}</td></tr>`;
    }
    text += "</table>";
    this.tablaErrores = []
    return text;
  }



}