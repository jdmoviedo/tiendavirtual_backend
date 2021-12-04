const express = require("express");
const egresos = require("../model/model_egresos");

const egresosController = {};

egresosController.insertar = async (egreso) => {
  egreso.fecha_creacion = Date.now();
  return egresos.create(egreso);
};

egresosController.listar = async (usuario) => {
  return await (
    await egresos.find()
  ).filter((egreso) => {
    return egreso.producto[[0]].categoria[0].usuario[0].id == usuario;
  });
};

egresosController.actualizar = async (egreso) => {
  egreso.fecha_actualizacion = Date.now();
  return await egresos.findByIdAndUpdate(egreso._id, egreso);
};

egresosController.eliminar = async (id) => {
  return await egresos.findByIdAndDelete(id);
};

egresosController.buscar = async (id) => {
  return await egresos.findById(id);
};

module.exports = egresosController;
