import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { GetMovementsQuery } from '@/features/movements/application/queries/get-movements.query.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';
import { MovementMother } from '@/features/movements/domain/test/movement.mother.ts';

describe('GetMovementsQuery', () => {
	const setup = () => {
		const movementRepository = mock<MovementRepository>();
		const query = new GetMovementsQuery(movementRepository);
		return { movementRepository, query };
	};

	it('should return all movements from repository', async () => {
		const { movementRepository, query } = setup();
		const movements = MovementMother.list();
		movementRepository.getAll.mockResolvedValue(movements);

		const result = await query.execute();

		expect(movementRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toBe(movements);
	});

	it('should return empty list when repository has no data', async () => {
		const { movementRepository, query } = setup();
		movementRepository.getAll.mockResolvedValueOnce(MovementMother.empty());

		const result = await query.execute();

		expect(movementRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual([]);
	});

	it('should return repository errors', async () => {
		const { movementRepository, query } = setup();

		movementRepository.getAll.mockRejectedValue(new Error('boom'));

		await expect(query.execute()).rejects.toThrow('boom');
	});
});
