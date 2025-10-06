import type { Command } from '@/common/application/usecase/command.ts';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';

export class AddNewMovementCommand implements Command<NewMovement> {
	constructor(private readonly movementRepository: MovementRepository) {}

	execute(newMovement: NewMovement): Promise<void> {
		return this.movementRepository.create(newMovement);
	}
}
