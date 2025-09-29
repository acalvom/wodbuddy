import type { MovementPrimitives } from '@/features/movements/domain/interfaces/movement.ts';

export class Movement implements MovementPrimitives {
	id: number;
	name: string;
	image?: string;
	rm?: number;
	userId: string;

	constructor({ id, name, image, rm, userId }: MovementPrimitives) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.rm = rm;
		this.userId = userId;
	}

	static fromPrimitives(value: MovementPrimitives): Movement {
		return new Movement({
			id: value.id,
			name: value.name,
			image: value.image,
			rm: value.rm,
			userId: value.userId
		});
	}

	private getPercentageOfRM(percentage: number): number | undefined {
		if (!this.rm) return undefined;
		return Math.round((this.rm * percentage) / 100);
	}

	public formatPercentageOfRM(percentage: number): string {
		const value = this.getPercentageOfRM(percentage);
		if (!value) return '-';
		return `${value} kg (${percentage}%)`;
	}
}
