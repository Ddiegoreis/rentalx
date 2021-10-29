import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import UserRepository from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
	sub: string
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
	const authHeader = request.headers.authorization

	if (!authHeader)
		throw new AppError("Token missing", 401)

	const [, token] = authHeader.split(" ")

	try {
		const { sub: userId } = verify(token, "a7e071b3de48cec1dd24de6cbe6c7bf1") as IPayload

		const userRepository = new UserRepository()

		const user = userRepository.findById(userId)

		if (!user)
			throw new AppError("User not exists", 401)

		next()
	} catch {
		throw new AppError("Invalid token", 401)
	}
}