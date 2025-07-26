import routerx from "express-promise-router"
import UserController from "../controllers/UserController"
import auth from "../middlewares/auth"



const router = routerx();

// process.env.URL_BACKEND/api/users/register

router.post("/register", UserController.register);
router.post("/register_seller", UserController.register_seller);
router.put("/update", UserController.update);
router.get("/list",auth.verifyAdmin, UserController.list);
router.post("/register_admin",auth.verifyAdmin, UserController.register_admin);
router.post("/login", UserController.login);
router.post("/login_admin", UserController.login_admin);
router.post("/login_seller", UserController.login_seller);
router.delete("/delete", UserController.remove);
router.get('/:id', UserController.getById);


export default router;