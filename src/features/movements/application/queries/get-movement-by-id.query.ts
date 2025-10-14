import type { Query } from '@/common/application/usecase/query';
import type { Id } from '@/common/domain/interfaces/id';
import type { Movement } from '@/features/movements/domain/entities/movement';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository';

export class GetMovementByIdQuery implements Query<Movement | undefined, Id> {
	constructor(private readonly movementRepository: MovementRepository) {}

	execute(id: Id): Promise<Movement | undefined> {
		return this.movementRepository.getById(id);
	}
}
