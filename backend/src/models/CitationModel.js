import mongoose from "mongoose";

const citationSchema = new mongoose.Schema({
	cedula: {
		type: String,
		trim: true,
	},
	correo: {
		type: String,
		trim: true,
	},
	telefono: {
		type: String,
		trim: true,
	},
	asunto: {
		type: String,
		trim: false,
	},
	oficina: {
		type: String,
		trim: false,
	},
	fecha: Date,
	hora: {
		type: String,
		trim: false,
	},
});

export default mongoose.model("Citation", citationSchema);
