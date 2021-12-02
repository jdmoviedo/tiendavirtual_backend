const { application, request, response } = require("express");
const stringify = require("nodemon/lib/utils");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const usuariosController = require("./controller/controller_usuarios");
const municipiosController = require("./controller/controller_municipios");
const categoriasController = require("./controller/controller_categorias");
const productosController = require("./controller/controller_productos");
const ingresosController = require("./controller/controller_ingresos");
const egresosController = require("./controller/controller_egresos");

const app = express();

var port = process.env.PORT || 8080;

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  }),
  express.json({ limit: "50mb" })
);

// INICIO PETICION USUARIOS
//CREAR
app.post("/api/usuarios/signup", async (req, res) => {
  let usuario = req.body;
  try {
    await usuariosController.insertar(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

//INICIAR SESION
app.post("/api/usuarios/signin", async (req, res) => {
  let usuario = req.body;
  try {
    let respuesta = await usuariosController.signin(usuario);
    return res.status(200).json(respuesta);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ACTUALIZAR
app.put("/api/usuarios",verifyToken, async (req, res) => {
  let usuario = req.body;
  try {
    await usuariosController.actualizar(usuario);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTAR
app.get("/api/usuarios",verifyToken, async (req, res) => {
  try {
    let listaUsuarios = await usuariosController.listar();
    res.status(200).json(listaUsuarios);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/usuarios/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    let consultaUsuario = await usuariosController.buscar(id);
    res.status(200).json(consultaUsuario);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BORRAR
app.delete("/api/usuarios/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    await usuariosController.eliminar(id);
    res.status(200).json("Persona Eliminada");
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION USUARIOS

// INICIO PETICION MUNICIPIOS
//LISTAR MUNICIPIOS / DEPARTAMENTOS
app.get("/api/municipios/:bBusqueda", async (req, res) => {
  let bBusqueda = req.params.bBusqueda;
  try {
    let lista = "";
    switch (bBusqueda) {
      case "1":
        lista = await municipiosController.listar();
        break;
      case "2":
        lista = await municipiosController.listarDepartamentos();
        break;
      default:
        lista = await municipiosController.listarMunicipiosxDepartamentos(
          bBusqueda
        );
        break;
    }
    res.status(200).json(lista);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/municipios/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let consultaMunicipio = await municipiosController.buscar(id);
    res.status(200).json(consultaMunicipio);
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION MUNICIPIOS

// INICIO PETICION CATEGORIAS
//CREAR
app.post("/api/categorias",verifyToken, async (req, res) => {
  let categoria = req.body;
  try {
    await categoriasController.insertar(categoria);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ACTUALIZAR
app.put("/api/categorias",verifyToken, async (req, res) => {
  let categoria = req.body;
  try {
    await categoriasController.actualizar(categoria);
    res.status(200).json(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTAR
app.get("/api/categorias/usuario/",verifyToken, async (req, res) => {
  let usuario = req.usuario;
  try {
    let listacategorias = await categoriasController.listar(usuario);
    res.status(200).json(listacategorias);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/categorias/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    let consultaCategoria = await categoriasController.buscar(id);
    res.status(200).json(consultaCategoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BORRAR
app.delete("/api/categorias/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    await categoriasController.eliminar(id);
    res.status(200).json("Categoria Eliminada");
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION CATEGORIAS

// INICIO PETICION PRODUCTOS
//CREAR
app.post("/api/productos",verifyToken, async (req, res) => {
  let producto = req.body;
  try {
    await productosController.insertar(producto);
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ACTUALIZAR
app.put("/api/productos",verifyToken, async (req, res) => {
  let producto = req.body;
  try {
    await productosController.actualizar(producto);
    res.status(200).json(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTAR
app.get("/api/productos/usuario/",verifyToken, async (req, res) => {
  let usuario = req.usuario;
  try {
    let listaProdutos = await productosController.listar(usuario);
    res.status(200).json(listaProdutos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTARXCATEGORIA
app.post("/api/productos/usuario/",verifyToken, async (req, res) => {
  let busqueda = req.body;
  try {
    let listaProdutos = await productosController.listarxcategoria(busqueda);
    res.status(200).json(listaProdutos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/productos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    let consultaProductos = await productosController.buscar(id);
    res.status(200).json(consultaProductos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BORRAR
app.delete("/api/productos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    await productosController.eliminar(id);
    res.status(200).json("Producto Eliminado");
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION PRODUCTOS

// INICIO PETICION EGRESOS
//CREAR
app.post("/api/egresos",verifyToken, async (req, res) => {
  let egresos = req.body;
  try {
    await egresosController.insertar(egresos);
    res.status(200).json(egresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ACTUALIZAR
app.put("/api/egresos",verifyToken, async (req, res) => {
  let egresos = req.body;
  try {
    await egresosController.actualizar(egresos);
    res.status(200).json(egresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTAR
app.get("/api/egresos/usuario/",verifyToken, async (req, res) => {
  let usuario = req.usuario;
  try {
    let listaegresos = await egresosController.listar(usuario);
    res.status(200).json(listaegresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/egresos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    let consultaegresos = await egresosController.buscar(id);
    res.status(200).json(consultaegresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BORRAR
app.delete("/api/egresos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    await egresosController.eliminar(id);
    res.status(200).json("Egresos Eliminado");
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION EGRESOS

// INICIO PETICION INGRESOS
//CREAR
app.post("/api/ingresos", verifyToken, async (req, res) => {
  let ingreso = req.body;
  try {
    await ingresosController.insertar(ingreso);
    res.status(200).json(ingreso);
  } catch (error) {
    res.status(400).send(error);
  }
});

//ACTUALIZAR
app.put("/api/ingresos",verifyToken, async (req, res) => {
  let ingreso = req.body;
  try {
    await ingresosController.actualizar(ingreso);
    res.status(200).json(ingreso);
  } catch (error) {
    res.status(400).send(error);
  }
});

//LISTAR
app.get("/api/ingresos/usuario/",verifyToken, async (req, res) => {
  let usuario = req.usuario;
  try {
    let listaingresos = await ingresosController.listar(usuario);
    res.status(200).json(listaingresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BUSCAR
app.get("/api/ingresos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    let consultaingresos = await ingresosController.buscar(id);
    res.status(200).json(consultaingresos);
  } catch (error) {
    res.status(400).send(error);
  }
});

//BORRAR
app.delete("/api/ingresos/:id",verifyToken, async (req, res) => {
  let id = req.params.id;
  try {
    await ingresosController.eliminar(id);
    res.status(200).json("Ingreso Eliminado");
  } catch (error) {
    res.status(400).send(error);
  }
});
// FIN PETICION INGRESOS

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Autorizacion Errada");
  }
  const token = req.headers.authorization;
  if (token === null) {
    return res.status(401).send("Autorizacion Errada");
  }

  const datos = jwt.verify(token, "secretkey");
  req.usuario = datos._id;
  next();
}

app.listen(port, () => console.log("Servidor Corriendo"));
