import Citation from "../models/CitationModel.js";

export const getAllCitations = async (req, res) => {
	const allCitations = await Citation.find();
	res.json(allCitations);
};

export const getCitation = async (req, res) => {
	const citationData = await Citation.findOne({ cedula: req.params.cedula });

	res.send(citationData);
};

export const newCitation = async (req, res) => {
	try {
		const result = await Citation.create(req.body);
		res.status(201).json({
			message: "Registro creado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al crear el registro",
			error,
		});
	}
};

export const modicCitation = async (req, res) => {
	try {
		const result = await Citation.updateOne(
			{ cedula: req.params.cedula },
			req.body,
			{ upsert: true }
		);
		res.status(200).json({
			message: "Registro actualizado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al actualizar el registro",
			error,
		});
	}
};

export const deleteCitation = async (req, res) => {
	try {
		const result = await Citation.deleteOne({ cedula: req.params.cedula });
		res.status(200).json({
			message: "Registro eliminado exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al eliminar el registro",
			error,
		});
	}
};
