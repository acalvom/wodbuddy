import type { Mark } from '../entities/mark';

export class MarkCollection {
	private readonly marks: readonly Mark[];
	private static readonly DEFAULT_RECENT_LIMIT = 7;

	constructor(marks: Mark[]) {
		this.marks = Object.freeze([...marks]);
	}

	static fromMarks(marks: Mark[]): MarkCollection {
		return new MarkCollection(marks);
	}

	getRecent(limit: number = MarkCollection.DEFAULT_RECENT_LIMIT): Mark[] {
		return this.marks.slice(0, limit);
	}

	hasMoreThan(limit: number = MarkCollection.DEFAULT_RECENT_LIMIT): boolean {
		return this.marks.length > limit;
	}

	get count(): number {
		return this.marks.length;
	}
}
