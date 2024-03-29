import Citation from "../models/CitationModel.js";

export const runServer = (req, res) => {
	return res.json({
		status: "success",
		routes: {
			getAllData: 'http://localhost:4000/all-citations',
			getOneData: 'http://localhost:4000/citation/id',
		},
	});
};

export const getAllCitations = async (req, res) => {
	try {
		const result = await Citation.find();
		if (!result.length) {
			return res.status(404).json({
				message: "No se han encontrado registros",
			});
		}
		res.status(200).json({
			message: "Registros obtenidos exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener los registros",
			error,
		});
	}
};

export const getCitation = async (req, res) => {
	try {
		const result = await Citation.findOne({ cedula: req.params.cedula });
		if (!result) {
			return res.status(404).json({
				message: "El registro solicitado no ha sido encontrado",
				result,
			});
		}
		res.status(200).json({
			message: "Registro obtenido exitosamente",
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Error al obtener el registro",
			error,
		});
	}
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
