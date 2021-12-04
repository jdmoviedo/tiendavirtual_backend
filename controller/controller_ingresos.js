const express = require("express");
const ingresos = require("../model/model_ingresos");

const ingresosController = {};

ingresosController.insertar = async (ingreso) => {
  ingreso.fecha_creacion = Date.now();
  return ingresos.create(ingreso);
};

ingresosController.listar = async (usuario) => {
  return await (
    await ingresos.find()
  ).filter((ingreso) => {
    return ingreso.producto[[0]].categoria[0].usuario[0].id == usuario;
  });
};

ingresosController.actualizar = async (ingreso) => {
  ingreso.fecha_actualizacion = Date.now();
  return await ingresos.findByIdAndUpdate(ingreso._id, ingreso);
};

ingresosController.eliminar = async (id) => {
  return await ingresos.findByIdAndDelete(id);
};

ingresosController.buscar = async (id) => {
  return await ingresos.findById(id);
};

module.exports = ingresosController;
