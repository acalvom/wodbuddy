import type { Id } from '@/common/domain/interfaces/id';
import type { Movement } from '@/features/movements/domain/entities/movement';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement';

export interface MovementRepository {
	getAll(): Promise<Movement[]>;
	getById(id: Id): Promise<Movement | undefined>;
	create(newMovement: NewMovement): Promise<void>;
}
