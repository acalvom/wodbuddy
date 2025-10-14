import type { NewMovement } from '@/features/movements/domain/entities/new-movement';
import type { ZodNewMovement } from '@/features/movements/ui/models/zod-new-movement';

export const zodToDomain = (data: ZodNewMovement, userId: string): NewMovement => ({
	name: data.name,
	rm: parseFloat(data.rm),
	userId
});
