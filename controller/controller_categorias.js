const express = require("express");
const categorias = require("../model/model_categorias");
const usuarios = require("../model/model_usuarios");

const categoriasController = {};

categoriasController.insertar = async (categoria) => {
  categoria.fecha_creacion = Date.now();
  return categorias.create(categoria);
};

categoriasController.listar = async (usuario) => {
  return await categorias.find({ usuario: usuario });
};

categoriasController.actualizar = async (categoria) => {
  categoria.fecha_actualizacion = Date.now();
  return await categorias.findByIdAndUpdate(categoria._id, categoria);
};

categoriasController.eliminar = async (id) => {
  return await categorias.findByIdAndDelete(id);
};

categoriasController.buscar = async (id) => {
  return await categorias.findById(id);
};

module.exports = categoriasController;
