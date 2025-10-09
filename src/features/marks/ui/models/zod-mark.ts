import z from 'zod';

export const ZodAddMarkFormSchema = z.object({
	value: z
		.string()
		.min(1, 'Sin valor no hay marca')
		.regex(/^\d+(\.\d+)?$/, 'Debe ser un número válido (ej: 100.5)')
		.refine((val) => parseFloat(val) > 0, 'Debe ser mayor que 0'),
	createdOn: z.date().optional()
});

export type ZodAddMark = z.infer<typeof ZodAddMarkFormSchema>;
