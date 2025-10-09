import { z } from 'zod';

export const ZodPercentageSchema = z.object({
	percentage: z
		.string()
		.min(1, 'Añade un porcentaje')
		.regex(/^\d+$/, 'Solo números enteros')
		.refine((val) => {
			const n = Number(val);
			return n >= 0;
		}, 'Debe ser mayor o igual a 0')
});

export type ZodPercentageForm = z.infer<typeof ZodPercentageSchema>;
