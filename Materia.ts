const { v4: uuidv4 } = require('uuid');

export default class Materia {
    nombre: string;
    id: string;
  
    constructor(nombre: string, id: string) {
      this.nombre= nombre;
      this.id = uuidv4 ().slice(0,6);
    }
      
  }