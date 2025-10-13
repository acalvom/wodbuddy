import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { MarkMother } from '@/features/marks/domain/mothers/mark.mother';
import type { MarksRepository } from '@/features/marks/domain/repositories/marks.repository';
import { GetCurrentPRQuery } from './get-current-pr.query';

describe('GetCurrentPRQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const marksRepository = mock<MarksRepository>();
		const query = new GetCurrentPRQuery(marksRepository);
		return { marksRepository, query };
	};

	it('should return current PR for a movement', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		const prMark = MarkMother.isPr();
		marksRepository.getCurrentPR.mockResolvedValueOnce(prMark);

		// Act
		const result = await query.execute(movementId);

		// Assert
		expect(marksRepository.getCurrentPR).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentPR).toHaveBeenCalledWith(movementId);
		expect(result).toEqual(prMark);
	});

	it('should return undefined when movement has no PR', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		marksRepository.getCurrentPR.mockResolvedValueOnce(undefined);

		// Act
		const result = await query.execute(movementId);

		// Assert
		expect(marksRepository.getCurrentPR).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentPR).toHaveBeenCalledWith(movementId);
		expect(result).toBeUndefined();
	});

	it('should return repository errors', async () => {
		// Arrange
		const { marksRepository, query } = setup();
		const movementId = 1;
		marksRepository.getCurrentPR.mockRejectedValueOnce(new Error('Database error'));

		// Act + Assert
		await expect(query.execute(movementId)).rejects.toThrow('Database error');
		expect(marksRepository.getCurrentPR).toHaveBeenCalledTimes(1);
		expect(marksRepository.getCurrentPR).toHaveBeenCalledWith(movementId);
	});
});