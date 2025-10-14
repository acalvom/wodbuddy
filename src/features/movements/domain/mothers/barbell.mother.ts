import { Barbell } from '@/features/movements/domain/value-objects/barbell';
import { BarbellType } from '@/features/movements/domain/value-objects/barbell-type';
import { Disc } from '@/features/movements/domain/value-objects/disc';

export class BarbellMother {
	static empty(type = BarbellType.ManBarbell): Barbell {
		return new Barbell(type, []);
	}

	static loaded(type = BarbellType.ManBarbell, discs: Disc[] = [Disc.TWENTY, Disc.TEN, Disc.FIVE]): Barbell {
		return new Barbell(type, discs);
	}
}
