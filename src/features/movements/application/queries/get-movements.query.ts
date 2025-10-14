import type { Query } from '@/common/application/usecase/query';
import type { Movement } from '@/features/movements/domain/entities/movement';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository';

export class GetMovementsQuery implements Query<Movement[]> {
	constructor(private movementRepository: MovementRepository) {}

	execute(): Promise<Movement[]> {
		return this.movementRepository.getAll();
	}
}
