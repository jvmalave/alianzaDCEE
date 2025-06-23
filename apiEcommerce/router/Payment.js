import paymentController from "../controllers/PaymentController";
import auth from "../middlewares/auth";
import routerx from "express-promise-router"

const router = routerx();


// Procesar pago temporal
router.post('/', [auth.verifyEcommerce], paymentController.createTempPayment);

// Obtener pagos pendientes 
router.get('/admin/pending',[auth.verifyEcommerce], paymentController.getPendingPayments);

// Actualizar estado de pago
router.put('/admin/:id', [auth.verifyEcommerce], paymentController.updatePaymentStatus);

export default router;









