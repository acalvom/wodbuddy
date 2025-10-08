export class Parser {
	static toInt(value: string): number | null {
		const parsed = parseInt(value, 10);
		return Number.isNaN(parsed) ? null : parsed;
	}
}
