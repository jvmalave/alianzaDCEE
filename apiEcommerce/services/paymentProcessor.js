const TempPayment = require('../models/TempPayment');
const Sale = require('../models/Sale');
const SaleAddress = require('../models/SaleAddress');
const SaleDetail = require('../models/SaleDetail');
const emailService = require('./emailService');

exports.processConfirmedPayment = async (paymentId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const tempPayment = await TempPayment.findById(paymentId)
      .populate('user products.product')
      .session(session);

    // 1. Crear venta
    const sale = new Sale({
      user: tempPayment.user,
      total: tempPayment.total,
      paymentMethod: tempPayment.method_payment,
      currencyPayment: tempPayment.currency_payment,
      nTransaction: tempPayment.n_transaction,
      nameBank: tempPayment.name_bank,
      numberPhone: tempPayment.number_phone,
      idCardNumber: tempPayment.id_card_number,
      priceDolar: tempPayment.price_dolar,
      status: 'completado'
    });

    // 2. Crear dirección
    const saleAddress = new SaleAddress({
      sale: sale._id,
      ...tempPayment.address
    });

    // 3. Crear detalles
    const saleDetails = tempPayment.products.map(item => ({
      sale: sale._id,
      product: item.product,
      quantity: item.quantity,
      price: item.product.price
    }));

    await Promise.all([
      sale.save({ session }),
      SaleAddress.create([saleAddress], { session }),
      SaleDetail.insertMany(saleDetails, { session }),
      TempPayment.deleteOne({ _id: paymentId }).session(session)
    ]);

    await session.commitTransaction();
    
    // 4. Enviar email
    emailService.sendConfirmation(tempPayment.user.email, sale._id);

    return { success: true };

  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
