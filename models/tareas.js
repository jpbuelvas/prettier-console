const Tarea = require("./tarea");

class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      listado.push(this._listado[key]);
    });
    return listado;
  }
  constructor() {
    this._listado = {};
  }
  borrarTarea(id = ''){
    if(this._listado[id]){  
      delete this._listado[id];
    }
  }
  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  crearTareas(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto(tareas = []) {
    this.listadoArr.forEach((tarea, index) => {
      let count = `${index + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${count} ${desc} :: ${estado}`)
    });
  }
  listarPendientesCompletadas(completadas = true){
    let count = 1;

    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
        const estado = (completadoEn)?'Completada'.green:'Pendiente'.red
        if(completadas){
          if(completadoEn !== null){
            console.log(`${count.toString().green + '.'.green} ${desc} :: ${completadoEn.green}`)
            count += 1;
          }
        }else{
          if(completadoEn === null){
            console.log(`${count.toString().green + '.'.green} ${desc} :: ${estado}`)
            count += 1;
          }
        }
    })
  }
  toggleCompletadas(ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if( !ids.includes(tarea.id) ){
        this._listado[tarea.id].completadoEn = null;
        
      }
    })
  }
}

module.exports = Tareas;
