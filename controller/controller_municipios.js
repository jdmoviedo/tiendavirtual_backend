const express = require("express");
const municipios = require("../model/model_municipios");

const municipiosController = {};

municipiosController.listar = async () => {
  return await municipios.find();
};

municipiosController.listarDepartamentos = async () => {
  return await municipios.distinct("departamento");
};

municipiosController.listarMunicipiosxDepartamentos = async (departamento) => {
  return await municipios.find({ departamento: departamento });
};

municipiosController.buscar = async (id) => {
  return await municipios.findById(id);
};

module.exports = municipiosController;
