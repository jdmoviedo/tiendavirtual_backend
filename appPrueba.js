const { request, response } = require("express");
const express = require("express");

const app = express();
app.use(express.json());

let personas = [
  {
    cc: "10",
    nombre: "Luis Alberto",
    apellido: "Triana",
    edad: 33,
    estadoCivil: "soltera",
  },
  {
    cc: "20",
    nombre: "Juan",
    apellido: "Mendoza",
    edad: 40,
    estadoCivil: "Casado",
  },
  {
    cc: "30",
    nombre: "Pepita",
    apellido: "Perez",
    edad: 50,
    estadoCivil: "soltera",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hola a todos</h1>");
});

app.get("/api/personas", (req, res) => {
  res.status(201).json(personas);
});

app.post("/api/personas", (req, res) => {
  const persona = req.body;
  let existe = false;
  let buscando = 0;
  for (let index = 0; index < personas.length; index++) {
    if (persona.cc == personas[index].cc) {
      buscando = index;
      existe = true;
      break;
    }
  }

  if (!existe) {
    personas.push(persona);
    res.status(200).json(personas);
  } else {
    personas[buscando] = persona;
    res.status(200).json(personas);
  }
});

app.delete("/api/personas/:id", (req, res) => {
  let id = req.params.id;
  for (let index = 0; index < personas.length; index++) {    
    if (id == personas[index].cc) {
      personas.splice(index,1);
      break;
    }
  }
  res.status(200).json(personas);
});

app.listen(3000, () => {
  console.log("Server Corriendo");
});
