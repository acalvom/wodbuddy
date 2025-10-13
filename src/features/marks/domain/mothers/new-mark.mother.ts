import { faker } from '@faker-js/faker';
import { NewMark } from '../entities/new-mark';

export class NewMarkMother {
	static one(newMark?: Partial<NewMark>): NewMark {
		return NewMark.fromPrimitives({
			value: newMark?.value ?? faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
			createdOn: newMark?.createdOn ?? new Date(),
			userId: newMark?.userId ?? faker.string.uuid(),
			movementId: newMark?.movementId ?? faker.number.int({ min: 1, max: 1000 })
		});
	}
}
