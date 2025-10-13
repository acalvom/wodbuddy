import { Parser } from '@/common/domain/parser/parser';
import type { MovementPrimitives } from '@/features/movements/domain/entities/movement.primitives.ts';

export class Movement implements MovementPrimitives {
	id: number;
	name: string;
	rm?: number;
	userId: string;

	constructor({ id, name, rm, userId }: MovementPrimitives) {
		this.id = id;
		this.name = name;
		this.rm = rm;
		this.userId = userId;
	}

	static fromPrimitives(value: MovementPrimitives): Movement {
		return new Movement(value);
	}

	public getPercentageOfRM(percentage: number): number | undefined {
		if (!this.rm) return undefined;
		const value = (this.rm * percentage) / 100;
		return Math.round(value * 2) / 2;
	}

	public formatPercentageOfRM(percentage: number): string {
		const value = this.getPercentageOfRM(percentage);
		if (!value) return '-';
		return `${value} kg`;
	}

	public formatCalculatorPercentageOfRM(percentage: number | string): string {
		if (typeof percentage === 'string') {
			percentage = Parser.toInt(percentage) || 0;
		}

		const value = this.getPercentageOfRM(percentage);
		if (!value) return `${percentage}% = 0 kg`;
		return `${percentage}% = ${value} kg`;
	}
}
