import { expect } from 'vitest';
import { BarbellMother } from '@/features/movements/domain/test/barbell.mother.ts';
import { BarbellType } from '@/features/movements/domain/value-objects/barbell-type.ts';
import { Disc } from '@/features/movements/domain/value-objects/disc.ts';

describe('BarbellEntity', () => {
	it('should return totalWeight with empty barbell', () => {
		const manBarbell = BarbellMother.empty(BarbellType.ManBarbell);
		expect(manBarbell.totalWeight).toBe(20);

		const womanBarbell = BarbellMother.empty(BarbellType.WomanBarbell);
		expect(womanBarbell.totalWeight).toBe(15);

		const beginnerBarbell = BarbellMother.empty(BarbellType.BeginnerBarbell);
		expect(beginnerBarbell.totalWeight).toBe(10);

		const kidsBarbell = BarbellMother.empty(BarbellType.KidsBarbell);
		expect(kidsBarbell.totalWeight).toBe(5);
	});

	it('should return totalWeight with loaded barbell', () => {
		const discSet = [Disc.TEN, Disc.FIVE, Disc.TWO_POINT_FIVE];
		const manBarbell = BarbellMother.loaded(BarbellType.ManBarbell, discSet);
		const totalDiscWeight = (10 + 5 + 2.5) * 2; // multiplied by 2 for both sides

		expect(manBarbell.totalWeight).toBe(BarbellType.ManBarbell.weight + totalDiscWeight);
	});

	it('should provide a correct barbell configuration with empty barbell', () => {
		const barbell = BarbellMother.empty(BarbellType.ManBarbell);
		const targetWeight = 100; // 20 (bar) + 80 (discs)
		const expectedDiscs = [Disc.TWENTY_FIVE, Disc.FIFTEEN];

		barbell.configure(targetWeight);

		expect(barbell.totalWeight).toBe(targetWeight);
		expect(barbell.loadedDiscs).toEqual(expectedDiscs);
	});

	it('should throw an error if target weight is a negative number', () => {
		const barbell = BarbellMother.empty(BarbellType.ManBarbell);
		const targetWeight = -10;

		expect(() => barbell.configure(targetWeight)).toThrow('Target weight must be a positive number');
	});

	it('should provide a correct barbell configuration with loaded barbell when target is grater than loaded', () => {
		const discs = [Disc.TEN, Disc.TWENTY_FIVE, Disc.TWENTY_FIVE]; // 10 + 25 + 25 = 60 per side
		const barbell = BarbellMother.loaded(BarbellType.ManBarbell, discs);
		const targetWeight = 140; // 20 (bar) + 120 (discs)

		barbell.configure(targetWeight);

		expect(barbell.totalWeight).toBe(targetWeight);
		expect(barbell.loadedDiscs).toEqual(discs);
	});

	it('should provide a correct barbell configuration with loaded barbell when target is less than loaded', () => {
		const discs = [Disc.TEN, Disc.TWENTY_FIVE, Disc.TWENTY_FIVE]; // 10 + 25 + 25 = 60 per side
		const barbell = BarbellMother.loaded(BarbellType.ManBarbell, discs);
		const targetWeight = 100; // 20 (bar) + 80 (discs)
		const expectedDiscs = [Disc.TWENTY_FIVE, Disc.FIFTEEN];

		barbell.configure(targetWeight);

		expect(barbell.totalWeight).toBe(targetWeight);
		expect(barbell.loadedDiscs).toEqual(expectedDiscs);
	});

	it('should provide a correct barbell configuration with loaded barbell when target is less than bar weight', () => {
		const discs = [Disc.TEN, Disc.TWENTY_FIVE, Disc.TWENTY_FIVE]; // 10 + 25 + 25 = 60 per side
		const barbell = BarbellMother.loaded(BarbellType.ManBarbell, discs);
		const targetWeight = 10; // less than bar weight

		barbell.configure(targetWeight);
		expect(barbell.totalWeight).toBe(20); // should be equal to bar weight
		expect(barbell.loadedDiscs).toEqual([]);
	});

	it('should throw an error if target weight is not exactly achievable with available discs', () => {
		const barbell = BarbellMother.empty(BarbellType.ManBarbell);
		const targetWeight = 23; // 20 (bar) + 3 (discs)

		expect(() => barbell.configure(targetWeight)).toThrow('Target weight not exactly achievable with available discs');
	});
});
