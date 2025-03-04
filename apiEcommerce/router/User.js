import routerx from "express-promise-router"
import UserController from "../controllers/UserController"
import auth from "../middlewares/auth"



const router = routerx();

// http://localhost:3000/api/users/register

router.post("/register", UserController.register);
router.put("/update", UserController.update);
router.get("/list",auth.verifyAdmin, UserController.list);
router.post("/register_admin",auth.verifyAdmin, UserController.register_admin);
router.post("/login", UserController.login);
router.post("/login_admin", UserController.login_admin);
router.delete("/delete", UserController.remove);


export default router;