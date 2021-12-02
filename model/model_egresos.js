const mongoose = require("../DB/conexionDB");
const productos = require("./model_productos");

//Egresos
const egresosSchema = mongoose.Schema(
  {
    valor_compra: Number,
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
    collection: "Egresos",
    versionKey: false,
  }
);

egresosSchema.plugin(require("mongoose-autopopulate"));

const egresos = mongoose.model("Egresos", egresosSchema);

module.exports = egresos;
