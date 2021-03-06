import { Router } from "express";
import multer from "multer";

import uploadConfig from '@config/upload'
import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticate";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp'))

const createCategoriesController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
	"/",
	ensureAuthenticate,
	ensureAdmin,
	createCategoriesController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post(
	"/import",
	ensureAuthenticate,
	ensureAdmin,
	upload.single("file"),
	importCategoryController.handle
);

export default categoriesRoutes;
