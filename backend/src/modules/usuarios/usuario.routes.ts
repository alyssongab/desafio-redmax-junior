import { Router } from "express";
import * as controller from "./usuario.controller.js";

const usersRouter = Router();

usersRouter.post('/', controller.createUser);
usersRouter.get('/', controller.listUsers);
usersRouter.delete('/:id', controller.deleteUser);

export default usersRouter;