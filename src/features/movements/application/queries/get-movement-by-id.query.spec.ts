import { mock } from 'vitest-mock-extended';
import { GetMovementByIdQuery } from '@/features/movements/application/queries/get-movement-by-id.query';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository';

describe('GetMovementByIdQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const movementRepository = mock<MovementRepository>();
		const query = new GetMovementByIdQuery(movementRepository);
		return { movementRepository, query };
	};

	it('should return a movement by id from repository', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		const movement = MovementMother.one();
		movementRepository.getById.mockResolvedValueOnce(movement);

		// Act
		const result = await query.execute(movement.id);

		// Assert
		expect(movementRepository.getById).toHaveBeenCalledTimes(1);
		expect(movementRepository.getById).toHaveBeenCalledWith(movement.id);
		expect(result).toEqual(movement);
	});

	it('should return undefined when movement does not exist', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		const nonExistentId = 0;
		movementRepository.getById.mockResolvedValueOnce(undefined);

		// Act
		const result = await query.execute(nonExistentId);

		// Assert
		expect(movementRepository.getById).toHaveBeenCalledTimes(1);
		expect(movementRepository.getById).toHaveBeenCalledWith(nonExistentId);
		expect(result).toBeUndefined();
	});

	it('should return repository errors', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		const movementId = 1;
		movementRepository.getById.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(query.execute(movementId)).rejects.toThrow('boom');
		expect(movementRepository.getById).toHaveBeenCalledTimes(1);
		expect(movementRepository.getById).toHaveBeenCalledWith(movementId);
	});
});
