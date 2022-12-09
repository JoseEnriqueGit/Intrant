const citaionCtrl = {};

const { Citation } = require("../models/Citation.model");

citaionCtrl.getCitation = async (req, res) => {
  const Citaions = await Citation.find();
  res.json(Citaions);
};

// citaionCtrl.postCitation = async (req, res) => {
//   const { cedula, correo, telefono, asunto, oficina, fecha, hora } = req.body;

//   const newCitation = new Citation({
//     cedula: cedula,
//     correo: correo,
//     telefono: telefono,
//     asunto: asunto,
//     oficina: oficina,
//     fecha: fecha,
//     hora: hora
//   });

//   // const citaion = await citationsSchema.find();
//   res.status(201).json(newCitation);
// };

module.exports = citaionCtrl;
