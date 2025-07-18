import routerx from "express-promise-router"
import productController from "../controllers/ProductController"
import auth from "../middlewares/auth"
import multiparty from 'connect-multiparty';
import variedadController from "../controllers/VariedadController";


var path = multiparty({uploadDir:'./uploads/product'});
const router = routerx();

// process.env.URL_BACKEND/api/users/register

router.post("/register", [auth.verifyAdmin, path], productController.register);


//IMAGEN PORTADA Y GALERIA
router.post("/register_imagen", [auth.verifyAdmin, path], productController.register_imagen);
router.post("/remove_imagen", [auth.verifyAdmin, path], productController.remove_imagen);


router.put("/update",[auth.verifyAdmin,path],productController.update);
router.get("/list",auth.verifyAdmin,productController.list);
router.get("/list-seller",auth.verifyAdmin,productController.list_seller);
router.delete("/delete",auth.verifyAdmin,productController.remove);

router.get("/uploads/product/:img",productController.obtener_imagen);

router.get("/show/:id",productController.show);

// VARIEDAD
router.post("/register-variedad",[auth.verifyAdmin,path],variedadController.register);
router.put("/update-variedad",[auth.verifyAdmin,path],variedadController.update);
router.delete("/delete-variedad/:id",[auth.verifyAdmin,path],variedadController.delete);


export default router;