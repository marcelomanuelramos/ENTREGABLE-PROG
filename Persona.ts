const { v4: uuidv4 } = require('uuid');

export default interface Persona {
     nombre: string;
     apellido: string;
     edad: number;
     readonly id: string;
    
 
  }