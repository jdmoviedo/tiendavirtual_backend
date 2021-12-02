const express = require("express");
const productos = require("../model/model_productos");

const productosController = {};

productosController.insertar = async (producto) => {
  producto.fecha_creacion = Date.now();
  return productos.create(producto);
};

productosController.listar = async (usuario) => {
  return await productos.find({ "categoria[].usuario": usuario });
};

productosController.listarxcategoria = async (busqueda) => {
  return await productos.find({
    "categoria[].usuario": busqueda.usuario,
    categoria: busqueda.categoria,
  });
};

productosController.actualizar = async (producto) => {
  producto.fecha_actualizacion = Date.now();
  return await productos.findByIdAndUpdate(producto._id, producto);
};

productosController.eliminar = async (id) => {
  return await productos.findByIdAndDelete(id);
};

productosController.buscar = async (id) => {
  return await productos.findById(id);
};

module.exports = productosController;
