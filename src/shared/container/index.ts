import { container } from "tsyringe";

import '@shared/container/providers'

import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import CategoryRepository from "@modules/cars/infra/typeorm/repositories/CategoryRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import CarRepository from "@modules/cars/infra/typeorm/repositories/CarRepository";
import CarImageRepository from "@modules/cars/infra/typeorm/repositories/CarImageRepository";
import RentalRepoisoty from "@modules/rentals/infra/typeorm/repositories/RentalRepoisoty";

import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository.";

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

container.registerSingleton<ICarImageRepository>(
	"CarImageRepository",
	CarImageRepository
)

container.registerSingleton<IRentalRepository>(
	'RentalRepository',
	RentalRepoisoty
)