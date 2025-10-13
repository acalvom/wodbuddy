import { faker } from '@faker-js/faker';
import { Mark } from '../entities/mark';

type MarkOverrides = Partial<Mark>;

const buildMark = (overrides: MarkOverrides = {}): Mark => {
	return Mark.fromPrimitives({
		id: overrides.id ?? faker.number.int({ min: 1, max: 1000 }),
		createdOn: overrides.createdOn ?? new Date(),
		isPr: overrides.isPr ?? false,
		isRm: overrides.isRm ?? false,
		value: overrides.value ?? faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
		movementId: overrides.movementId ?? faker.number.int({ min: 1, max: 1000 }),
		userId: overrides.userId ?? faker.string.uuid()
	});
};
export class MarkMother {
	static empty(): Mark[] {
		return [];
	}

	static one(overrides: MarkOverrides = {}): Mark {
		return buildMark(overrides);
	}

	static withOverrides(overrides: MarkOverrides): Mark {
		return buildMark(overrides);
	}

	static isPr(): Mark {
		return buildMark({
			isPr: true
		});
	}

	static isRm(): Mark {
		return buildMark({
			isRm: true
		});
	}

	static list(count = 2): Mark[] {
		return Array.from({ length: count }, () => MarkMother.one());
	}
}
