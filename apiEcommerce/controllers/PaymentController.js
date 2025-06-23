import TempPayment from '../models/TempPayment';
import models  from "../models";
import { processConfirmedPayment, processRejectedPayment } from '../services/paymentProcessor.js';

const createTempPayment = async (req, res) => {
  try {
     console.log('Datos recibidos:', req.body);
    const newPayment = new TempPayment({
      user: req.user.id, // Asume autenticación JWT
      method_payment: req.body.method_payment,
      currency_payment: req.body.data.moneda,
      n_transaction: req.body.data.referencia,
      name_bank: req.body.data.banco,
      number_phone: req.body.data.telefono,
      id_card_number: req.body.data.cedula,
      price_dolar: req.body.data.precio_dolar,
      status: 'pendiente',
      total_Bs: req.body.data.montoBs,
      total: req.body.total,
      products: req.body.products.map(p => ({
        product: p.product,
        seller_id: p.seller_id,
        quantity: p.quantity
      })),
      address: req.body.address
    });

    await newPayment.save();
    
    res.status(201).json({
      message: 'Pago registrado para verificación',
      reference: newPayment.reference
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getPendingPayments = async (req, res) => {
  try {
    const pagosPendientes = await models.TempPayment.find({ status: 'pendiente' })
      .populate('user', 'name email') // Ajusta campos según tu esquema
      .populate('products.product', 'name price') // Ajusta según esquema
      .populate('products.seller_id', 'company email phone', { strictPopulate: false }); // emprendedor

      console.log("PAGO", pagosPendientes)

      res.json(pagosPendientes);

  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // 'confirmado' o 'rechazado'

  try {
    const pago = await TempPayment.findById(id).populate('user').populate('products.product');
    if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });

    if (status === 'confirmado') {
      await processConfirmedPayment(pago);
      res.json({ message: 'Pago confirmado y procesado' });
    } else if (status === 'rechazado') {
      await processRejectedPayment(pago);
      res.json({ message: 'Pago rechazado' });
    } else {
      res.status(400).json({ error: 'Estado inválido' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporta como objeto por defecto
export default {
  createTempPayment,
  getPendingPayments,
  updatePaymentStatus
};

