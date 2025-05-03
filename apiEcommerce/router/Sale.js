import routerx from "express-promise-router"
import auth from "../middlewares/auth"
import SaleController from "../controllers/SaleController";

const router = routerx();

// process.env.URL_BACKEND/api/users/register

router.post("/register", [auth.verifyEcommerce], SaleController.register);
// router.get("/send_email/:id", SaleController.send_email);



export default router;