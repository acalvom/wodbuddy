import type { NewMovementPrimitives } from '@/features/movements/domain/entities/new-movement.primitives';

export class NewMovement implements NewMovementPrimitives {
	readonly name: string;
	readonly rm: number;
	readonly userId: string;

	constructor({ name, rm, userId }: NewMovementPrimitives) {
		this.name = name;
		this.rm = rm;
		this.userId = userId;
	}
}
