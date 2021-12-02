const mongoose = require("../DB/conexionDB");
const municipios = require("./model_municipios");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
//Usuarios
const usuariosSchema = mongoose.Schema(
  {
    correo: {
      type: String,
      uppercase: true,
    },
    password: String,
    nombre_tienda: {
      type: String,
      uppercase: true,
    },
    nombre_tendero: {
      type: String,
      uppercase: true,
    },
    nit: String,
    telefono: String,
    municipio: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Municipios",
        autopopulate: true,
      },
    ],
    estado: Number,
    rol: Number,
    fecha_creacion: Date,
    foto: String,
  },
  {
    collection: "Usuarios",
    versionKey: false,
  }
);

usuariosSchema.pre("save", function (next) {
  var usuario = this;

  // only hash the password if it has been modified (or is new)
  if (!usuario.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(usuario.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      usuario.password = hash;
      next();
    });
  });
});

usuariosSchema.pre("findOneAndUpdate", function (next) {
  var usuario = this;
  // only hash the password if it has been modified (or is new)
  if (!usuario._update.password) 
  {
  return next();
  }
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(usuario._update.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      usuario._update.password = hash;
      next();
    });
  });
});

usuariosSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    else {
      if (!isMatch) return cb(null, isMatch);
      return cb(null, this);
    }
  });
};

usuariosSchema.plugin(require("mongoose-autopopulate"));

const usuarios = mongoose.model("Usuarios", usuariosSchema);

module.exports = usuarios;
