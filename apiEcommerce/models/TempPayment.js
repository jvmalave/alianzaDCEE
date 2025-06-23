// models/TempPayment.js
import mongoose,{Schema}  from "mongoose";


const tempPaymentSchema = new mongoose.Schema({
    user: { type:Schema.ObjectId, ref: 'user', required: true },
    method_payment: { type: String, enum: ['pagoMovil', 'transferencia'], required: true },
    currency_payment: { type: String, default:'Bs'},
    n_transaction: { type: String, required: true },
    name_bank: {type:String, maxlength:200},
    number_phone: {type:String, maxlength: 12},
    id_card_number: {type: String, maxlength: 8},
    total_Bs: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ['pendiente', 'confirmado', 'rechazado'], default: 'pendiente' },
    products: [{
        product: { type: Schema.ObjectId, ref: 'product' },
        seller_id: { type: Schema.ObjectId, ref: 'user', required: true },
        quantity: Number
    }],
    address: { type: mongoose.Schema.Types.Mixed, required: true },
    price_dolar:{type:Number,default: 0},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TempPayment', tempPaymentSchema);




