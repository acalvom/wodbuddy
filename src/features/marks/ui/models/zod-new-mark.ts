import z from 'zod';

export const ZodNewMarkFormSchema = z.object({
	value: z
		.string()
		.min(1, 'Sin valor no hay marca')
		.regex(/^\d+(\.\d+)?$/, 'Debe ser un número válido (ej: 100.5)')
		.refine((val) => parseFloat(val) > 0, 'Debe ser mayor que 0'),
	createdOn: z.date().optional()
});

export type ZodNewMark = z.infer<typeof ZodNewMarkFormSchema>;
