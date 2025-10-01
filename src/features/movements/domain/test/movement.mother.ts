import { faker } from '@faker-js/faker';
import { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { MovementPrimitives } from '@/features/movements/domain/primitives/movement.primitives.ts';

export class MovementMother {
	static empty(): Movement[] {
		return [];
	}

	static one(movement?: Partial<Movement>): Movement {
		return Movement.fromPrimitives({
			id: movement?.id ?? faker.number.int({ min: 1, max: 1000 }),
			name: movement?.name ?? faker.lorem.words({ min: 1, max: 3 }),
			userId: movement?.userId ?? faker.string.uuid(),
			rm: movement?.rm ?? faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
		});
	}

	static withoutRm(): Movement {
		return Movement.fromPrimitives({
			id: faker.number.int({ min: 1, max: 1000 }),
			name: faker.lorem.words({ min: 1, max: 3 }),
			userId: faker.string.uuid(),
			rm: undefined
		});
	}

	static list(count = 2): Movement[] {
		return Array.from({ length: count }, () => MovementMother.one());
	}

	static primitives(): MovementPrimitives {
		return {
			id: faker.number.int({ min: 1, max: 1000 }),
			name: faker.lorem.words({ min: 1, max: 3 }),
			userId: faker.string.uuid(),
			rm: faker.number.float({ min: 0, max: 100, fractionDigits: 1 })
		};
	}
}
