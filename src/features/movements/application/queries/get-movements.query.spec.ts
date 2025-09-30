import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { GetMovementsQuery } from '@/features/movements/application/queries/get-movements.query.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';
import { MovementMother } from '@/features/movements/domain/test/movement.mother.ts';

describe('GetMovementsQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const movementRepository = mock<MovementRepository>();
		const query = new GetMovementsQuery(movementRepository);
		return { movementRepository, query };
	};

	it('should return all movements from repository', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		const movements = MovementMother.list(3);
		movementRepository.getAll.mockResolvedValueOnce(movements);

		// Act
		const result = await query.execute();

		// Assert
		expect(movementRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual(movements);
	});

	it('should return empty list when repository has no data', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		movementRepository.getAll.mockResolvedValueOnce(MovementMother.empty());

		// Act
		const result = await query.execute();

		// Assert
		expect(movementRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual([]);
	});

	it('should return repository errors', async () => {
		// Arrange
		const { movementRepository, query } = setup();
		movementRepository.getAll.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(query.execute()).rejects.toThrow('boom');
		expect(movementRepository.getAll).toHaveBeenCalledTimes(1);
	});
});
