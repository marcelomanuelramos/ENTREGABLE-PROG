import Persona from "./Persona";
const { v4: uuidv4 } = require('uuid');

export default class Profesor implements Persona {
    nombre: string;
    apellido: string;
    edad:number;
    asignatura: string;
    contrato: boolean;
    id:string;
  
  
    constructor(nombre: string,apellido:string, edad: number, asignatura: string, contrato:boolean,id:string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.asignatura = asignatura;
        this.contrato = contrato;
        this.id = uuidv4 ().slice(0,6);
 
     
    }
  }