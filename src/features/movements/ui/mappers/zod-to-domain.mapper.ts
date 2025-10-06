import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';
import type { ZodNewMovement } from '@/features/movements/ui/models/zod-new-movement.ts';

export const zodToDomain = (data: ZodNewMovement, userId: string): NewMovement => ({
	name: data.name,
	rm: parseFloat(data.rm),
	userId
});
