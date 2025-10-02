import type { UseQueryResult } from '@tanstack/react-query';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother.ts';

type MovementsListComponentTOType = UseQueryResult<Movement[], Error>;

export class MovementsListComponentTO {
	private static base(result: Partial<MovementsListComponentTOType>) {
		return {
			data: undefined,
			isPending: false,
			isError: false,
			...result
		} as MovementsListComponentTOType;
	}

	static withoutMovements() {
		return this.base({ data: MovementMother.empty() });
	}

	static withOneMovement(data: Movement = MovementMother.one()) {
		return this.base({ data: [data] });
	}

	static withMultipleMovements(count: number = 2, data?: Movement[]) {
		return this.base({ data: data ?? MovementMother.list(count) });
	}

	static loading() {
		return this.base({ isPending: true });
	}

	static error() {
		return this.base({ isError: true });
	}
}
