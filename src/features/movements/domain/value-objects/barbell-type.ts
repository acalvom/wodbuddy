export class BarbellType {
	weight: number;
	category: string;

	constructor(weight: number, category: string) {
		this.weight = weight;
		this.category = category;
	}

	static ManBarbell = new BarbellType(20, 'man');
	static WomanBarbell = new BarbellType(15, 'woman');
	static BeginnerBarbell = new BarbellType(10, 'beginner');
	static KidsBarbell = new BarbellType(5, 'kids');
}
