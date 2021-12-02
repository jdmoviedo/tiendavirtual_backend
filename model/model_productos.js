const mongoose = require("../DB/conexionDB");
const categorias = require("./model_categorias");

//Productos
const productosSchema = mongoose.Schema(
  {
    descripcion: {
      type: String,
      uppercase: true,
    },
    estado: Number,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    categoria: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categorias",
        autopopulate: true,
      },
    ],
    proveedor: {
      type: String,
      uppercase: true,
    },
    stock: Number,
  },
  {
    collection: "Productos",
    versionKey: false,
  }
);

productosSchema.plugin(require("mongoose-autopopulate"));

const productos = mongoose.model("Productos", productosSchema);

module.exports = productos;
