import { mock } from 'vitest-mock-extended';
import { AddNewMovementCommand } from '@/features/movements/application/commands/add-new-movement.command.ts';
import { NewMovementMother } from '@/features/movements/domain/mothers/new-movement.mother.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';

describe('AddNewMovementCommand', () => {
	afterEach(() => vi.clearAllMocks());
	const setup = () => {
		const movementRepository = mock<MovementRepository>();
		const command = new AddNewMovementCommand(movementRepository);
		return { movementRepository, command };
	};

	it('should add a new movement to the repository', async () => {
		// Arrange
		const { movementRepository, command } = setup();
		const newMovement = NewMovementMother.one();

		movementRepository.create.mockResolvedValueOnce();

		// Act
		await command.execute(newMovement);

		// Assert
		expect(movementRepository.create).toHaveBeenCalledTimes(1);
		expect(movementRepository.create).toHaveBeenCalledWith(newMovement);
	});

	it('should return repository errors', async () => {
		// Arrange
		const { movementRepository, command } = setup();
		const newMovement = NewMovementMother.one();
		movementRepository.create.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(command.execute(newMovement)).rejects.toThrow('boom');
		expect(movementRepository.create).toHaveBeenCalledTimes(1);
		expect(movementRepository.create).toHaveBeenCalledWith(newMovement);
	});
});
