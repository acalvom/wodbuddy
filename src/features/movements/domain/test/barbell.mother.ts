import { Barbell } from '@/features/movements/domain/value-objects/barbell.ts';
import { BarbellType } from '@/features/movements/domain/value-objects/barbell-type.ts';
import { Disc } from '@/features/movements/domain/value-objects/disc.ts';

export class BarbellMother {
	static empty(type = BarbellType.ManBarbell): Barbell {
		return new Barbell(type, []);
	}

	static loaded(type = BarbellType.ManBarbell, discs: Disc[] = [Disc.TWENTY, Disc.TEN, Disc.FIVE]): Barbell {
		return new Barbell(type, discs);
	}
}
