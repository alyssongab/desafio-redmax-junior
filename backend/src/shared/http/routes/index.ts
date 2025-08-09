import { Router } from "express";
import usersRouter from "../../../modules/usuarios/usuario.routes.js";

const routes = Router();

routes.use('/usuarios', usersRouter);

export default routes;