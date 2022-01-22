import ICreateRentalDTO from "../dtos/ICreateRentalDto";
import Rental from "../infra/typeorm/entities/Rental";

interface IRentalRepository {
	findOpenRentalByCar(car_id: string): Promise<Rental>
	findOpenRentalByUser(user_id: string): Promise<Rental>
	create({ car_id, user_id, expected_return_date, end_date, id, start_date, total }: ICreateRentalDTO): Promise<Rental>
	findById(id: string): Promise<Rental>
}

export { IRentalRepository }