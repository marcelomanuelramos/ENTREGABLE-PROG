import Persona from "./Persona";
import Materia from "./Materia";
import Profesor from "./Profesor";
const { v4: uuidv4 } = require('uuid');


const fs = require('fs');
const readlineSync = require('readline-sync');


export enum MateriasMatriculadas{
    Electricidad,    
    Neumatica,
    Mecanica,
    Fundicion,
    Carpinteria,
   
 }
 

export default class Alumno implements Persona{
    nombre: string;
    apellido: string;
    edad: number;
    materiasMatriculadas: { materia: { nombre: string, id: string }, nota: number }[];
    id: string;
    //promedioNotas:string
  
    
    constructor(nombre: string, apellido: string, edad: number,materiasMatriculadas:[],
         id: string){
           this.nombre = nombre;
           this.apellido = apellido;
           this.edad =edad;
           this.materiasMatriculadas = [];
           this.id = uuidv4 ().slice(0,6);
           //this.promedioNotas= promedioNotas

        }
      }
    
  

       
       
      
     
       

      
     
    
      


