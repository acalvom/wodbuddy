export class Color {
	hex: string;
	name: string;

	constructor(hex: string, name: string) {
		this.hex = hex;
		this.name = name;
	}

	static Red = new Color('#FF0000', 'Red');
	static Blue = new Color('#0000FF', 'Blue');
	static Yellow = new Color('#FFFF00', 'Yellow');
	static Green = new Color('#008000', 'Green');
	static White = new Color('#FFFFFF', 'White');
	static Black = new Color('#000000', 'Black');
	static Silver = new Color('#C0C0C0', 'Silver');
	static Grey = new Color('#808080', 'Grey');
}
