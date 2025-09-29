import type { Query } from '@/common/application/usecase/query.ts';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';

export class GetMovementsQuery implements Query<Movement[]> {
	constructor(private movementRepository: MovementRepository) {}

	execute(): Promise<Movement[]> {
		return this.movementRepository.getAll();
	}
}
