import mongoose,{Schema} from "mongoose";

const ConfigSchema = new Schema({
  tasaCambio_bcv: { type: Number, required: true },
  fecha_vigencia: { type: Date, required: false }, // para tasa de cambio con fecha manual
  fechaActualizacion_tasaCambio: { type: Date, default: Date.now }, // fecha de actualización tasa
  porc_iva: { type: Number, required: true },
  fechaActualizacion_iva: { type: Date, default: Date.now }, // timestamp al actualizar IVA
}, 
{ timestamps: true });

const Config = mongoose.model("Config",ConfigSchema);
export default Config;

