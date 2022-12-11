import Citation from "../models/CitationModel.js";

export const getAllCitations = async (req, res) => {
	const allCitations = await Citation.find();
	res.json(allCitations);
};
export const getCitation = async (req, res) => {
	const citationData = await Citation.findOne({cedula: req.params.cedula});

	res.send(citationData);
};
export const newCitation = async (req, res) => {
	const { cedula, correo, telefono, asunto, oficina, fecha, hora } = req.body;

	const newCitation = new Citation({
		cedula: cedula,
		correo: correo,
		telefono: telefono,
		asunto: asunto,
		oficina: oficina,
		fecha: fecha,
		hora: hora,
	});
	await newCitation.save();
	res.status(204).json(newCitation);
};
export const modicCitation = async (req, res) => {
	const update = await Citation.updateOne({cedula: req.params.cedula}, req.body, {new: true})
	res.send(update);
};
export const deleteCitation = async (req, res) => {
	await Citation.deleteOne({ cedula: req.params.cedula });
	res.status(204).send("Ok");
};
``