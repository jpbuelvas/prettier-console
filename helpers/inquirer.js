const inquirer = require("inquirer");
require("colors");
const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "que desea hacer",
    choices: [
      {
        value: "1",
        name: `${"1".blue}. Crear tarea`,
      },
      {
        value: "2",
        name: `${"2".blue}.Listar tareas`,
      },
      {
        value: "3",
        name: `${"3".blue}.Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4".blue}.Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5".blue}.Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6".blue}.Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0".blue}.Salir`,
      },
    ],
  },
];
const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".green);
  console.log(" Seleccione una opcion ".white);
  console.log("===========================\n".green);
  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};
const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};
const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};
const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });
  const { id } = await inquirer.prompt(preguntas);
  return id;
};
const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};
const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${index + 1}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked : (tarea.completadoEn) ? true : false
    };
  });
  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices
    },
  ];
 
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};


module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};
