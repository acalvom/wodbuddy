import { Disc } from '@/features/movements/domain/value-objects/disc.ts';

export class Barbell {
	public readonly weight: number;
	private discs: Disc[] = [];

	constructor(weight: number, discs: Disc[]) {
		this.weight = weight;
		this.discs = discs;
	}

	private sortDiscs(): void {
		this.discs.sort((a, b) => b.value - a.value);
	}

	private addDisc(disc: Disc): void {
		this.discs.push(disc);
	}

	configure(targetWeight: number): void {
		const weightToLoad = targetWeight - this.weight;
		if (weightToLoad <= 0) {
			this.discs = [];
			return;
		}

		this.discs = [];

		const availableDiscs = Disc.standardDiscs().sort((a, b) => b.weight - a.weight);
		let remainingWeight = weightToLoad / 2;

		for (const disc of availableDiscs) {
			while (remainingWeight >= disc.value) {
				this.addDisc(disc);
				remainingWeight -= disc.value;
			}
		}

		if (remainingWeight > 0) {
			throw new Error('Target weight not exactly achievable with available discs');
		}
	}

	get totalWeight(): number {
		const discsWeight = this.discs.reduce((acc, disc) => acc + disc.value * 2, 0);
		return this.weight + discsWeight;
	}

	get loadedDiscs(): Disc[] {
		return this.discs;
	}
}
