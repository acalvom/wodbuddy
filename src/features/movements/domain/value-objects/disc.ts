import { Color } from '@/features/movements/domain/value-objects/color.ts';

export class Disc {
	value: number;
	color: Color;

	constructor(value: number, color: Color) {
		this.value = value;
		this.color = color;
	}

	static fromPrimitive(value: number, color: Color): Disc {
		return new Disc(value, color);
	}

	static readonly TWENTY_FIVE = Disc.fromPrimitive(25, Color.Red);
	static readonly TWENTY = Disc.fromPrimitive(20, Color.Blue);
	static readonly FIFTEEN = Disc.fromPrimitive(15, Color.Yellow);
	static readonly TEN = Disc.fromPrimitive(10, Color.Green);
	static readonly FIVE = Disc.fromPrimitive(5, Color.White);
	static readonly TWO_POINT_FIVE = Disc.fromPrimitive(2.5, Color.Black);
	static readonly ONE_POINT_TWO_FIVE = Disc.fromPrimitive(1.25, Color.Silver);
	static readonly ZERO_POINT_FIVE = Disc.fromPrimitive(0.5, Color.Grey);

	static standardDiscs(): Disc[] {
		return [
			this.TWENTY_FIVE,
			this.TWENTY,
			this.FIFTEEN,
			this.TEN,
			this.FIVE,
			this.TWO_POINT_FIVE,
			this.ONE_POINT_TWO_FIVE,
			this.ZERO_POINT_FIVE
		];
	}
}
