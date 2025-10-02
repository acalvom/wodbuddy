export class Color {
	hex: string;
	name: string;

	constructor(hex: string, name: string) {
		this.hex = hex;
		this.name = name;
	}

	static Red = new Color('red', 'Red');
	static Blue = new Color('blue', 'Blue');
	static Yellow = new Color('yellow', 'Yellow');
	static Green = new Color('green', 'Green');
	static White = new Color('white', 'White');
	static Black = new Color('black', 'Black');
	static Silver = new Color('silver', 'Silver');
	static Gray = new Color('gray', 'Gray');
}
