const mongoose = require("../DB/conexionDB");
const productos = require("./model_productos");

//Ingresos
const ingresosSchema = mongoose.Schema(
  {
    valor_venta: Number,
    cantidad: Number,
    fecha_creacion: Date,
    fecha_actualizacion: Date,
    producto: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Productos",
        autopopulate: true,
      },
    ],
  },
  {
    collection: "Ingresos",
    versionKey: false,
  }
);

ingresosSchema.plugin(require("mongoose-autopopulate"));

const ingresos = mongoose.model("Ingresos", ingresosSchema);

module.exports = ingresos;
