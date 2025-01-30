import mongoose, {Schema} from "mongoose";

const DiscountSchema = new Schema({
  type_campaign:{ type:Number, required:true, default: 1 }, // 1: Campaña de descuento | 2: Venta Flash
  type_discount:{ type:Number, required:true, default: 1 }, // 1: porcentaje || 2: moneda
  discount: { type:Number, required:true },
  start_date: { type:Date, required:true },
  end_date: { type:Date, required:true },
  start_date_num: { type:Number, required:true },
  end_date_num: { type:Number, required:true },
  state: { type:Number, required:true, default:1 }, // 1: Activo || 2: Desactivo
  type_segment: { type:Number, required:true, default:1 }, // 1: Por Productos || 2:Por Categorias
  products: [{type: Object, required: false }],
  categories: [{type: Object, required: false }],

},{
  timestamps: true,
});

const Discount = mongoose.model("discounts", DiscountSchema);
export default Discount;