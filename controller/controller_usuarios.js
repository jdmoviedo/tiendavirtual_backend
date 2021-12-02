const express = require("express");
const usuarios = require("../model/model_usuarios");
const jwt = require("jsonwebtoken");
const usuariosController = {};
const bcrypt = require("bcrypt");

usuariosController.insertar = async (usuario) => {
  usuario.fecha_creacion = Date.now();
  return usuarios.create(usuario);
};

usuariosController.listar = async () => {
  return await usuarios.find();
};

usuariosController.actualizar = async (usuario) => {
  return await usuarios.findByIdAndUpdate(usuario._id, usuario);
};

usuariosController.eliminar = async (id) => {
  return await usuarios.findByIdAndDelete({ _id: id });
};

usuariosController.buscar = async (id) => {
  return await usuarios.findById(id);
};

usuariosController.signin = async (usuario) => {
  const user = await usuarios.findOne({ correo: usuario.correo });

  if (!user) return { codigo: 1 };

  const passwordCompare = await bcrypt.compare(usuario.password, user.password);

  if (!passwordCompare) {
    return { codigo: 2 };
  }

  const token = jwt.sign(
    { _id: user.id, rol: user.rol, nombre_tienda: user.nombre_tienda },
    "secretkey"
  );

  return { codigo: 3, token: token };
};

module.exports = usuariosController;
