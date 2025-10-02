import type { BarbellType } from '@/features/movements/domain/value-objects/barbell-type.ts';
import { Disc } from '@/features/movements/domain/value-objects/disc.ts';

export class Barbell {
	public readonly type: BarbellType;
	private discs: Disc[] = [];

	constructor(type: BarbellType, discs: Disc[] = []) {
		this.type = type;
		this.discs = discs;

		this.sortDiscs();
	}

	private addDisc(disc: Disc): void {
		this.discs.push(disc);
	}

	private sortDiscs(): void {
		this.discs.sort((a, b) => b.value - a.value);
	}

	private get weight(): number {
		return this.type.weight;
	}

	get totalWeight(): number {
		const discsWeight = this.discs.reduce((acc, disc) => acc + disc.value * 2, 0);
		return this.weight + discsWeight;
	}

	get loadedDiscs(): Disc[] {
		return this.discs;
	}

	configure(targetWeight: number): Disc[] {
		if (targetWeight < 0) throw new Error('Target weight must be a positive number');

		const weightToLoad = targetWeight - this.weight;
		this.discs = [];

		if (weightToLoad <= 0) return []; // No need to add discs if target weight is less than or equal to bar weight

		const availableDiscs = Disc.standardDiscs().sort((a, b) => b.value - a.value);
		let remainingWeight = weightToLoad / 2;

		for (const disc of availableDiscs) {
			while (remainingWeight >= disc.value) {
				this.addDisc(disc);
				remainingWeight -= disc.value;
			}
		}
		return this.discs;
	}
}
