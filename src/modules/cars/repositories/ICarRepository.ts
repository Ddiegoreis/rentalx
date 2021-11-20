import ICreateCarDTO from "../dtos/ICreateCarDTO";

interface ICarRepository {
	create(data: ICreateCarDTO): Promise<void>
}

export { ICarRepository }