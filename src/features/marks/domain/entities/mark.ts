import type { MarkPrimitives } from './mark.primitives';

export class Mark implements MarkPrimitives {
	id: number;
	createdOn?: Date;
	isPr?: boolean;
	isRm?: boolean;
	value: number;
	movementId: number;
	userId: string;

	constructor({ id, createdOn, isPr, isRm, value, movementId, userId }: MarkPrimitives) {
		this.id = id;
		this.createdOn = createdOn;
		this.isPr = isPr;
		this.isRm = isRm;
		this.value = value;
		this.movementId = movementId;
		this.userId = userId;
	}

	static fromPrimitives(value: MarkPrimitives): Mark {
		return new Mark(value);
	}

	toPrimitives(): MarkPrimitives {
		return {
			id: this.id,
			createdOn: this.createdOn,
			isPr: this.isPr,
			isRm: this.isRm,
			value: this.value,
			movementId: this.movementId,
			userId: this.userId
		};
	}
}
