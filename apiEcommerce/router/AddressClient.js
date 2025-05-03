import routerx from "express-promise-router"
import auth from "../middlewares/auth"
import addressClientController from "../controllers/AddressClientController";

const router = routerx();

// process.env.URL_BACKEND/api/users/register

router.post("/register", [auth.verifyEcommerce], addressClientController.register);
router.put("/update",[auth.verifyEcommerce],addressClientController.update);
router.get("/list",auth.verifyEcommerce,addressClientController.list);
router.delete("/delete/:id",auth.verifyEcommerce,addressClientController.remove);


export default router;