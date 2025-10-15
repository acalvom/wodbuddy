import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { MarkMother } from '@/features/marks/domain/mothers/mark.mother';
import type { MarksRepository } from '@/features/marks/domain/repositories/marks.repository';
import { GetCurrentRMQuery } from './get-current-rm.query';

describe('GetCurrentRMQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const marksRepository = mock<MarksRepository>();
		const query = new GetCurrentRMQuery(marksRepository);
		return { marksRepository, query };
	};

	it('should return current RM for a movement', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		const rmMark = MarkMother.isRm();
		marksRepository.getCurrentRM.mockResolvedValueOnce(rmMark);

		// Act
		const result = await query.execute(movementId);

		// Assert
		expect(marksRepository.getCurrentRM).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentRM).toHaveBeenCalledWith(movementId);
		expect(result).toEqual(rmMark);
	});

	it('should return undefined when movement has no RM', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		marksRepository.getCurrentRM.mockResolvedValueOnce(undefined);

		// Act
		const result = await query.execute(movementId);

		// Assert
		expect(marksRepository.getCurrentRM).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentRM).toHaveBeenCalledWith(movementId);
		expect(result).toBeUndefined();
	});

	it('should return repository errors', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		marksRepository.getCurrentRM.mockRejectedValueOnce(new Error('Database error'));

		// Act + Assert
		await expect(query.execute(movementId)).rejects.toThrow('Database error');
		expect(marksRepository.getCurrentRM).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentRM).toHaveBeenCalledWith(movementId);
	});
});
