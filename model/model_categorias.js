const mongoose = require("../DB/conexionDB");
const usuarios = require("./model_usuarios");

//Categorias
const categoriasSchema = mongoose.Schema(
  {
    descripcion: {
      type: String,
      uppercase: true,
    },
    estado: Number,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    usuario: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        autopopulate: true,
      },
    ],
  },
  {
    collection: "Categorias",
    versionKey: false,
  }
);

categoriasSchema.plugin(require("mongoose-autopopulate"));

const categorias = mongoose.model("Categorias", categoriasSchema);

module.exports = categorias;
