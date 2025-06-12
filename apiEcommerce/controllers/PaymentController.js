import TempPayment from '../models/TempPayment';

const createTempPayment = async (req, res) => {
  try {
    const newPayment = new TempPayment({
      user: req.user.id, // Asume autenticación JWT
      method_payment: req.body.method,
      currency_payment: req.body.data.moneda,
      n_transaction: req.body.data.referencia,
      name_bank: req.body.data.banco,
      number_phone: req.body.data.telefono,
      id_card_number: req.body.data.cedula,
      price_dolar: req.body.data.precio_dolar,
      status: 'pendiente',
      total_bs: req.body.data.montoBs,
      total: req.body.total,
      products: req.body.productos,
      address: req.body.direccion
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
  // tu lógica aquí
};

const updatePaymentStatus = async (req, res) => {
  // tu lógica aquí
};

// Exporta como objeto por defecto
export default {
  createTempPayment,
  getPendingPayments,
  updatePaymentStatus
};

