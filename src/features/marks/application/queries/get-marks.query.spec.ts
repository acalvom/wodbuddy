import { afterEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { MarkMother } from '../../domain/mothers/mark.mother';
import type { MarksRepository } from '../../domain/repositories/marks.repository';
import { GetMarksQuery } from './get-marks.query';

describe('GetMarksQuery', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const markRepository = mock<MarksRepository>();
		const query = new GetMarksQuery(markRepository);
		return { markRepository, query };
	};

	it('should return all marks from repository', async () => {
		// Arrange
		const { markRepository, query } = setup();
		const marks = MarkMother.list(3);
		markRepository.getAll.mockResolvedValueOnce(marks);

		// Act
		const result = await query.execute();

		// Assert
		expect(markRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual(marks);
	});

	it('should return empty list when repository has no data', async () => {
		// Arrange
		const { markRepository, query } = setup();
		markRepository.getAll.mockResolvedValueOnce(MarkMother.empty());

		// Act
		const result = await query.execute();

		// Assert
		expect(markRepository.getAll).toHaveBeenCalledTimes(1);
		expect(result).toEqual([]);
	});

	it('should return repository errors', async () => {
		// Arrange
		const { markRepository, query } = setup();
		markRepository.getAll.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(query.execute()).rejects.toThrow('boom');
		expect(markRepository.getAll).toHaveBeenCalledTimes(1);
	});
});
