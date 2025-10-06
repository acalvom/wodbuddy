import { z } from 'zod';

export const ZodNewMovementSchema = z.object({
	name: z.string().min(3, 'Mínimo 3 caracteres'),
	rm: z
		.string()
		.min(1, 'El RM es obligatorio')
		.regex(/^\d+(\.\d+)?$/, 'Debe ser un número válido (ej: 100.5)')
		.refine((val) => parseFloat(val) > 0, 'Debe ser mayor que 0')
});

export type ZodNewMovement = z.infer<typeof ZodNewMovementSchema>;
