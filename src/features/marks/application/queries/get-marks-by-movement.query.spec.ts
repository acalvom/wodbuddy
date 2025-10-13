import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { MarkMother } from '../../domain/mothers/mark.mother';
import type { MarksRepository } from '../../domain/repositories/marks.repository';
import { GetMarksByMovementQuery } from './get-marks-by-movement.query';

describe('GetMarksByMovementQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const markRepository = mock<MarksRepository>();
		const query = new GetMarksByMovementQuery(markRepository);
		return { markRepository, query };
	};

	it('should return all marks from repository', async () => {
		// Arrange
		const { markRepository, query } = setup();
		const marks = MarkMother.list(3);
		markRepository.getByMovementId.mockResolvedValueOnce(marks);

		// Act
		const result = await query.execute(1);

		// Assert
		expect(markRepository.getByMovementId).toHaveBeenCalledTimes(1);
		expect(result).toEqual(marks);
	});

	it('should return empty list when repository has no data', async () => {
		// Arrange
		const { markRepository, query } = setup();
		markRepository.getByMovementId.mockResolvedValueOnce(MarkMother.empty());

		// Act
		const result = await query.execute(1);

		// Assert
		expect(markRepository.getByMovementId).toHaveBeenCalledTimes(1);
		expect(result).toEqual([]);
	});

	it('should return repository errors', async () => {
		// Arrange
		const { markRepository, query } = setup();
		markRepository.getByMovementId.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(query.execute(1)).rejects.toThrow('boom');
		expect(markRepository.getByMovementId).toHaveBeenCalledTimes(1);
	});
});
