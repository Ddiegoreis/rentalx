import { Router } from "express";

import categoriesRoutes from "./categories.routes";
import specificationsRoutes from "./specifications.routes";
import usersRoutes from "./users.routes";
import authenticateRoutes from "./authenticate.routes";
import carsRouter from "./cars.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationsRoutes);
routes.use("/users", usersRoutes)
routes.use("/cars", carsRouter)
routes.use(authenticateRoutes)

export default routes;
