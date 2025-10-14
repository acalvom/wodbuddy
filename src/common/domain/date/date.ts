import dayjs from 'dayjs';

export class DateFormatter {
	static format(date: Date): string {
		return dayjs(date).format('DD/MM/YYYY');
	}

	static toDate(dateString: string): Date {
		return dayjs(dateString).toDate();
	}
}
