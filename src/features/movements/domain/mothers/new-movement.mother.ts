import { faker } from '@faker-js/faker';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';

export class NewMovementMother {
	static one(newMovement?: Partial<NewMovement>): NewMovement {
		return {
			name: newMovement?.name ?? faker.lorem.words({ min: 1, max: 3 }),
			rm: newMovement?.rm ?? faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
			userId: newMovement?.userId ?? faker.string.uuid()
		};
	}
}
