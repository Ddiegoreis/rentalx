import { container } from "tsyringe";

import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import CategoryRepository from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import CarRepository from "@modules/cars/infra/typeorm/repositories/CarRepository";

container.registerSingleton<ICategoryRepository>(
	"CategoryRepository",
	CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
	"SpecificationRepository",
	SpecificationRepository
);

container.registerSingleton<IUserRepository>(
	"UserRepository",
	UserRepository
)

container.registerSingleton<ICarRepository>(
	"CarRepository",
	CarRepository
)