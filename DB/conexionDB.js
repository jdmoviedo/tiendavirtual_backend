const mongoose = require("mongoose");

const url =
  "mongodb+srv://tiendavitual:Abc123456@tiendavirtual.plyro.mongodb.net/tiendavirtual?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => console.log("CONECTADO A MONGO"))
  .catch((error) => console.log("La conexion fallo: " + error));

module.exports = mongoose;
