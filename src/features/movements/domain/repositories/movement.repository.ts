import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';

export interface MovementRepository {
	getAll(): Promise<Movement[]>;
	getById(id: Id): Promise<Movement | undefined>;
	create(newMovement: NewMovement): Promise<void>;
}
