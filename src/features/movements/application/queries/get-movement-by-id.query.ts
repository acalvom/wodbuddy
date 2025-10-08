import type { Query } from '@/common/application/usecase/query.ts';
import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';

export class GetMovementByIdQuery implements Query<Movement | undefined, Id> {
	constructor(private readonly movementRepository: MovementRepository) {}

	execute(id: Id): Promise<Movement | undefined> {
		return this.movementRepository.getById(id);
	}
}
