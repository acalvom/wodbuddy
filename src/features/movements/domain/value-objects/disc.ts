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

	static standardDiscs(): Disc[] {
		return [
			Disc.fromPrimitive(25, Color.Red),
			Disc.fromPrimitive(20, Color.Blue),
			Disc.fromPrimitive(15, Color.Yellow),
			Disc.fromPrimitive(10, Color.Green),
			Disc.fromPrimitive(5, Color.White),
			Disc.fromPrimitive(2.5, Color.Black),
			Disc.fromPrimitive(1.25, Color.Silver)
		];
	}
}
