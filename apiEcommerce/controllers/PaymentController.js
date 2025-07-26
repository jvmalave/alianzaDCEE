
import TempPayment from '../models/TempPayment';
import models  from "../models/index.js";
import { processConfirmedPayment, processRejectedPayment } from '../services/paymentProcessor.js';
import '../models/User.js';
import '../models/Product.js';
import '../models/TempPayment.js';




const createTempPayment = async (req, res) => {
  try {
     //console.log('Datos recibidos:', req.body);
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
    // Obtén los pagos pendientes sin hacer populate para productos y seller_id
    const pagosPendientes = await models.TempPayment.find({ status: 'pendiente' })
      .populate('user', 'name surname email') // Puedes mantener populate para user si funciona bien
      .lean(); // Usamos lean para mejor rendimiento y manipulación sencilla

    // Iteramos para enriquecer los productos con datos manualmente
    for (const pago of pagosPendientes) {
      for (const item of pago.products) {
        // Obtener datos del producto
        if (item.product) {
          const prod = await models.Product.findById(item.product).select('title price_usd').lean();
          item.product_title = prod ? prod.title : 'Producto no encontrado';
          item.product_price_usd = prod ? prod.price_usd : null;
        } else {
          item.product_title = 'Producto no especificado';
          item.product_price_usd = null;
        }

        // Obtener datos del vendedor (emprendedor)
        if (item.seller_id) {
          const seller = await models.User.findById(item.seller_id).select('company email phone').lean();
          item.seller_company = seller ? seller.company : 'Emprendedor no encontrado';
          item.seller_email = seller ? seller.email : null;
          item.seller_phone = seller ? seller.phone : null;
        } else {
          item.seller_company = 'Emprendedor no especificado';
          item.seller_email = null;
          item.seller_phone = null;
        }
      }
    }

    // Envía la respuesta con los datos enriquecidos
    res.json(pagosPendientes);

  } catch (error) {
    console.error('Error al obtener pagos pendientes:', error);
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

