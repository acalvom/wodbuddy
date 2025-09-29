import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';

export interface MovementRepository {
	getAll(): Promise<Movement[]>;
	getById(id: Id): Promise<Movement | undefined>;
}
