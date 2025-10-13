import type { NewMarkPrimitives } from './new-mark.primitives';

export class NewMark implements NewMarkPrimitives {
	value: number;
	createdOn?: Date;
	movementId: number;
	userId: string;

	constructor({ createdOn, value, movementId, userId }: NewMarkPrimitives) {
		this.createdOn = createdOn;
		this.value = value;
		this.movementId = movementId;
		this.userId = userId;
	}

	static fromPrimitives(value: NewMarkPrimitives): NewMark {
		return new NewMark(value);
	}
}
