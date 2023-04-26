import Alumno from "./Alumno"
import Profesor from "./Profesor"
import Materia from "./Materia";
import { chequear, escribir, leer, guardar } from "./Utils";
const { v4: uuidv4 } = require('uuid');

const pathProfesores = ('./Profesores.json')
const pathAlumnos = ('./Alumnos.json')

const fs = require('fs');
const readlineSync = require('readline-sync');

export default class EscuelaTecnica {
    nombre: string;
    alumnos: [];
    materias: [];
    profesor: [];

    constructor(nombre: string) {
      this.nombre = nombre;
      this.alumnos = [];
      this.materias = [];
      this.profesor = [];
      
    }
    
    public obtenerMateria(materiaBuscada: string, materias: Materia[]): Materia | null {
      return materias.find(materia => materia.nombre === materiaBuscada) || null;
    }
  
    agregarAlumno() {
      const pathAlumnos = './Alumnos.json';
      const pathMaterias = './Materias.json';
      let nombre = readlineSync.question('Nombre del alumno: ');
      let apellido = readlineSync.question('Apellido del alumno: ');
      let edad = readlineSync.question('Edad del alumno: ');
      let id = uuidv4().slice(0, 6)
      let Materias = leer(pathMaterias);
      let materias: string[] = ['Electricidad', 'Neumatica', 'Mecanica', 'Fundicion', 'Carpinteria'];
      //Arreglo para almacenar las materias matriculadas y las notas
      let materiasMatriculadas: { materia: Materia, nota: number }[] = [];
      // Seleeccionar las materias matriculadas y las notas
      while (true) {
        let indiceMateriasMatriculadas = readlineSync.keyInSelect(materias, 'Materias que se quiere anotar: ');
  
        if (indiceMateriasMatriculadas === -1) {
          break;
        }
  
        let materiaElegida = materias[indiceMateriasMatriculadas];
        let materia = this.obtenerMateria(materiaElegida, Materias); // Obtener la materia seleccionada
  
        if (materia) {
          let nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
          nota = parseInt(nota);
  
          while (!(nota >= 0 && nota <= 10)) {
            console.log('Por favor, ingrese un numero entre 0 y 10');
            nota = readlineSync.question(`Ingrese la nota para la materia ${materia.nombre}: `);
            nota = parseInt(nota);
          }
  
  
          materiasMatriculadas.push({ materia: materia, nota: nota });
  
        } else {
          console.log('No se encontró la materia en la lista de materias. ');
        }
      }
      // Calcular la suma de las notas de las materias matriculadas
      let sumaNotas = 0;
      for (let i = 0; i < materiasMatriculadas.length; i++) {
        sumaNotas += materiasMatriculadas[i].nota;
      }
  
      let promedioNotas = sumaNotas / materiasMatriculadas.length;
      let nuevoAlumno = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        materiasMatriculadas: materiasMatriculadas,
        id: id,
        promedioNotas: promedioNotas
      }
  
      guardar(pathAlumnos, nuevoAlumno);
      console.log('Alumno agregado!');
    }
  
    modificarAlumno() {
  
    }
  
    eliminarAlumno(): void {
      const id = readlineSync.question('Ingrese el ID del alumno a eliminar: ')
      let alumnos = leer('./Alumnos.json');
      const indice = alumnos.findIndex((alumno: Alumno) => alumno.id === id);
      if (indice !== -1) {
        alumnos.splice(indice, 1); // Eliminar el alumno del array
        escribir(alumnos, './Alumnos.json');
        console.log(`El alumno con ID ${id} ha sido eliminado`);
      } else {
        console.log(`No se ha encontrado un alumno con ID ${id}`);
      }
    }
  
    agregarProfesor() {
      const pathProfesores = './Profesores.json';
      let nombre = readlineSync.question('Nombre del profesor: ');
      let apellido = readlineSync.question('Apellido del profesor: ');
      let edad = readlineSync.question('Edad del profesor: ');
      let contrato = readlineSync.question('Contrato del profesor: ');
      let materias = leer('./materias.json')
      console.log('Materias disponibles:');
      for (let materia of materias) {
        console.log(`ID: ${materia.id}, Nombre: ${materia.nombre}`);
      }
      let materiaId = readlineSync.question('Id de la materia que ejerce: ');
  
      let id = uuidv4().slice(0, 6);
      let nuevoProfesor = new Profesor(nombre, apellido, edad, materiaId, contrato, id);
  
  
      guardar(pathProfesores, nuevoProfesor);
    }
  
    actualizarContratoProfesor(): void {
      const id = readlineSync.question('Ingrese el ID del profesor del contrato a actualizar: ')
      const profesores = leer('./Profesores.json');
      let ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
      if (ProfesorEncontrado) {
        ProfesorEncontrado.contrato = true;
        escribir(profesores, './Profesores.json',);
        console.log(`Se actualizo el contrato del profesor con ID ${id} `);
      } else {
        console.log(`No se ha encontrado al profesor con ID ${id}`);
      }
    }
    
    rescindirContratoDeProfesor(): void {
      const id = readlineSync.question('Ingrese el ID del profesor del contrato ha rescindir: ')
      const profesores = leer('./Profesores.json');
      let ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
      if (ProfesorEncontrado) {
        ProfesorEncontrado.contrato = false;
        escribir(profesores, './Profesores.json',);
        console.log(`Se rescindio el contrato del profesor con ID ${id} `);
      } else {
        console.log(`No se ha encontrado al profesor con ID ${id}`);
      }
    } 
  
    agregarMateria() {
      let pathMateria = './Materias.json'
      let nombre = readlineSync.question('Nombre de la materia: ');
      let id = uuidv4().slice(0, 6);
      let nuevaMateria = new Materia(nombre, id);
      guardar(pathMateria, nuevaMateria);
    }
  
    // Función para obtener profesores por ID de alumno
    getProfesoresPorAlumno() {
      const profesores = leer(pathProfesores);
      const alumnos = leer(pathAlumnos);
      const alumnoId = readlineSync.question('Ingresa el ID del alumno: ');
  
      // Buscar al alumno por su ID
      const alumno = alumnos.find((alumno: any) => alumno.id === alumnoId);
  
      if (alumno) {
        const materiaId = alumno.materiaId;
        // const profesoresDelAlumno = profesores.filter((profesor: any) => profesor.materiaId === materiaId);
        const materiaIds = alumno.materiasMatriculadas.map((materiaMatriculada: any) => materiaMatriculada.materia.id);
        const profesoresDelAlumno = profesores.filter((profesor: any) => materiaIds.includes(profesor.materiaId));
  
        console.log('Profesores del alumno:');
        if (profesoresDelAlumno.length > 0) {
          console.log(profesoresDelAlumno);
        } else {
          console.log('No se encontraron profesores para el alumno con ID:', alumnoId);
        }
      } else {
        console.log('No se encontró el alumno con ID:', alumnoId);
      }
    }
  
    // Definir la función
    getAlumnosPorProfesor() {
      const profesores = leer(pathProfesores);
      const alumnos = leer(pathAlumnos);

      // Solicitar el ID del profesor al usuario
      const profesorId = readlineSync.question('Por favor, ingrese el ID del profesor: ');
  
      // Buscar al profesor por su ID
      const profesor = profesores.find((profesor: any) => profesor.id === String(profesorId));
  
      if (profesor) {
        const materiaId = profesor.materiaId;
        const alumnosDelProfesor = alumnos.filter((alumno: any) => {
          // Buscar si el alumno tiene la materia en la cual el profesor dicta clases
          return alumno.materiasMatriculadas.some((materiaMatriculada: any) => materiaMatriculada.materia.id === materiaId);
        });
  
        // console.log('Alumnos del profesor:');
        if (alumnosDelProfesor.length > 0) {
          console.log(JSON.stringify(alumnosDelProfesor, null, 2));
        } else {
          console.log('No se encontraron alumnos para el profesor con ID:', profesorId);
        }
      } else {
        console.log('No se encontró el profesor con ID:', profesorId);
      }
  
    } buscarProfesor(): Profesor {
      const id = readlineSync.question('Ingrese el ID del profesor: ');
      const profesores = leer('./Profesores.json');
      const ProfesorEncontrado = profesores.find((profesor: Profesor) => profesor.id === id);
      if (ProfesorEncontrado) {
        console.log(id, 'Existe en la lista', ProfesorEncontrado);
        return ProfesorEncontrado;
      } else () => {
        console.log(id, 'No existe en la lista')
      }
      return ProfesorEncontrado;
    }
  
    buscarAlumno(): Alumno {
      const id = readlineSync.question('Ingrese el ID del alumno: ');
      const alumnos = leer('./Alumnos.json');
      const AlumnoEncontrado = alumnos.find((alumno: Alumno) => alumno.id === id);
      if (AlumnoEncontrado) {
        console.log(id, 'Existe en la lista', JSON.stringify(AlumnoEncontrado, null, 2));
        return AlumnoEncontrado;
      } else {
        console.log(id, 'No existe en la lista');
        return AlumnoEncontrado;
      }
  
    }
  
    listarAlumnos(): void {
      // const pathAlumnos = './Alumnos.json';
      const alumnos = leer(pathAlumnos);
      console.log(JSON.stringify(alumnos, null, 2));
    }
  
    alumnosPorPromedio(){
      const alumnos = leer(pathAlumnos);
  // Ordenar los alumnos por promedio de notas en orden descendente
  alumnos.sort((a: any, b: any) => b.promedioNotas - a.promedioNotas);
  
  // Listar los alumnos con sus nombres y promedios en orden
  console.log('Alumnos ordenados por promedio de notas:');
  alumnos.forEach((alumno: any) => {
    console.log(`Nombre: ${alumno.nombre} ${alumno.apellido} - Promedio de notas: ${alumno.promedioNotas}`);
  });
    }
  
    listarProfesores(): void {
      // const pathProfesores = './Profesores.json';
      const profesores = leer(pathProfesores);
    }
  
    Menu(): void {
      console.log('==== MENU ====');
      console.log('1. Lista de Alumnos ');
      console.log('2. Lista de Profesores ');
      console.log('3. Buscar Alumno por id ');
      console.log('4. Buscar Profesor por id ');
      console.log('5. Obtener profesores de un Alumno ');
      console.log('6. Obtener alumnos de un Profesor ');
      console.log('7. Listar alumnos por promedio ');
      console.log('8. Salir ');
    }
  
    salir(): void {
      console.log('Adiós!');
    }
    ejecutarOpcion(opcion: string): void {
      switch (opcion) {
        case '1':
          this.listarAlumnos();
          break;
        case '2':
          this.listarProfesores();
          break;
        case '3':
          this.buscarAlumno();
          break;
        case '4':
          this.buscarProfesor();
          break;
        case '5':
          this.getProfesoresPorAlumno();
          break;
        case '6':
          this.getAlumnosPorProfesor();
          break;
        case '7':
          this.alumnosPorPromedio();
          break;
        case '8':
          this.salir()
          console.log('Adios y Gracias');
          break;
        default:
          console.log('Opción inválida, intenta de nuevo');
      }
    }
    run(): void {
      let opcionSeleccionada: string = '';
      while (opcionSeleccionada !== '8') {
        this.Menu();
        opcionSeleccionada = readlineSync.question('Escribe el numero de la opcion que deseas: ');
        this.ejecutarOpcion(opcionSeleccionada);
        this.run
      }
    }
  
  }
  
