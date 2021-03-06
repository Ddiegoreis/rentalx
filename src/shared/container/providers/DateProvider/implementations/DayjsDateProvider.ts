import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

import { IDateProvider } from "../IDateProvider"

class DayjsDateProvider implements IDateProvider {
	compareInHours(start_date: Date, end_date: Date): number {
		const startDateUTC = this.convertToUTC(start_date)
		const endDateUTC = this.convertToUTC(end_date)

		return dayjs(endDateUTC)
			.diff(startDateUTC, 'hours')
	}

	convertToUTC(date: Date): string {
		return dayjs(date)
			.utc()
			.local()
			.format()
	}

	dateNow(): Date {
		return dayjs().toDate()
	}

	differenceInDays(start_date: Date, end_date: Date): number {
		const startDateUTC = this.convertToUTC(start_date)
		const endDateUTC = this.convertToUTC(end_date)

		return dayjs(endDateUTC)
			.diff(startDateUTC, 'days')
	}
}

export default DayjsDateProvider