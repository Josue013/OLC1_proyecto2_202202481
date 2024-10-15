"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Entorno_1 = require("../../Entorno/Entorno");
const Instruccion_1 = require("../Instruccion");
const Break_1 = require("../Break");
const Return_1 = require("../Return");
class Switch extends Instruccion_1.Instruccion {
    constructor(cond, cases, Default, line, column) {
        super(line, column);
        this.cond = cond;
        this.cases = cases;
        this.Default = Default;
    }
    ejecutar(entorno) {
        // Verifica que haya al menos un caso o un default
        if (this.cases == null && this.Default == null) {
            throw new Error("Error en Switch: No hay casos ni default");
        }
        let valor = false; // Indica si se ha encontrado un caso coincidente
        let Default2 = true; // Indica si se debe ejecutar el caso default
        const cond = this.cond.calcular(entorno); // Calcula el valor de la condición del switch
        const nuevoEntorno = new Entorno_1.Entorno(entorno); // Crea un nuevo entorno para los casos
        if (this.cases != null) {
            for (const Case of this.cases) {
                const c = Case.cond.calcular(nuevoEntorno); // Calcula el valor de la condición del caso
                // Verifica si el valor y el tipo de dato coinciden con la condición del switch
                if (c.valor == cond.valor && c.tipoDato == cond.tipoDato && !valor) {
                    const r = Case.ejecutar(nuevoEntorno); // Ejecuta el caso
                    if (r != null || r != undefined) {
                        if (r instanceof Break_1.Break) {
                            Default2 = false; // No se ejecuta el caso default
                            break;
                        }
                        else if (r instanceof Return_1.Return) {
                            return r; // Retorna el valor si es una instrucción de retorno
                        }
                        else {
                            throw new Error("Error en Case");
                        }
                    }
                    valor = true; // Indica que se ha encontrado un caso coincidente
                }
                else if (valor) {
                    const r = Case.ejecutar(nuevoEntorno); // Ejecuta el caso si ya se ha encontrado un caso coincidente
                    if (r != null || r != undefined) {
                        if (r instanceof Break_1.Break) {
                            Default2 = false; // No se ejecuta el caso default
                            valor = false;
                            break;
                        }
                        else if (r instanceof Return_1.Return) {
                            return r; // Retorna el valor si es una instrucción de retorno
                        }
                        else {
                            throw new Error("Error en Case");
                        }
                    }
                }
            }
            // Ejecuta el caso default si se ha encontrado un caso coincidente
            if (this.Default != null && valor) {
                Default2 = false;
                const r = this.Default.ejecutar(nuevoEntorno);
                if (r != null || r != undefined) {
                    if (r instanceof Break_1.Break) {
                        return;
                    }
                    else if (r instanceof Return_1.Return) {
                        return r;
                    }
                    else {
                        throw new Error("Error en Case");
                    }
                }
            }
        }
        // Ejecuta el caso default si no se ha encontrado un caso coincidente
        if (this.Default != null && Default2) {
            const r = this.Default.ejecutar(nuevoEntorno);
            if (r != null || r != undefined) {
                if (r instanceof Break_1.Break) {
                    return;
                }
                else if (r instanceof Return_1.Return) {
                    return r;
                }
                else {
                    throw new Error("Error en Case");
                }
            }
        }
    }
}
exports.Switch = Switch;
