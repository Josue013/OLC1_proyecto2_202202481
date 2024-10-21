"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contador {
    constructor() {
        this.contador = 0;
    }
    static getInstancia() {
        if (!Contador.instancia) {
            Contador.instancia = new Contador();
        }
        return Contador.instancia;
    }
    get() {
        this.contador++;
        return this.contador;
    }
}
exports.default = Contador;
// Singleton
