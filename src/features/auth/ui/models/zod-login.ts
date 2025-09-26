import { z } from 'zod';

export const ZodLoginSchema = z.object({
	email: z.email('Email inválido'),
	password: z.string().min(6, 'Mínimo 6 caracteres')
});

export type ZodLogin = z.infer<typeof ZodLoginSchema>;
