const mongoose = require("../DB/conexionDB");

//Municipios
const municipiosSchema = mongoose.Schema(
  {
    region: String,
    codigo_dane_del_departamento: Number,
    departamento: String,
    codigo_dane_del_municipio: Number,
    municipio: String,
  },
  {
    collection: "Municipios",
    versionKey: false,
  }
);

const municipios = mongoose.model("Municipios", municipiosSchema);

module.exports = municipios;
