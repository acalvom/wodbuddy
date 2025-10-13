import type { NewMark } from '../../domain/entities/new-mark';
import type { ZodNewMark } from './zod-new-mark';

export const zodToDomain = (data: ZodNewMark, userId: string, movementId: number): NewMark => ({
	value: parseFloat(data.value),
	createdOn: data.createdOn,
	userId,
	movementId
});
