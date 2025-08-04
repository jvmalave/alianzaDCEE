import routerx from 'express-promise-router';
import configController from '../controllers/ConfigController.js';
import auth from '../middlewares/auth.js';

const router = routerx();

// Rutas para configuración
router.get('/', auth.verifyAdmin, configController.getConfig);       // Obtener configuración
router.put('/tasa-cambio', auth.verifyAdmin, configController.updateTasaCambio); // Actualiza tasa de cambio
router.put('/porc-iva', auth.verifyAdmin, configController.updatePorcIva); // Actualiza porcentaje IVA


export default router;
