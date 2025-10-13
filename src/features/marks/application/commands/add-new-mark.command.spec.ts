import { mock } from 'vitest-mock-extended';
import { MarkMother } from '../../domain/mothers/mark.mother';
import { NewMarkMother } from '../../domain/mothers/new-mark.mother';
import type { MarksRepository } from '../../domain/repositories/marks.repository';
import { AddNewMarkCommand } from './add-new-mark.command';

describe('AddNewMarkCommand', () => {
	afterEach(() => vi.clearAllMocks());
	const setup = () => {
		const markRepository = mock<MarksRepository>();
		const command = new AddNewMarkCommand(markRepository);
		return { markRepository, command };
	};

	it('should add a new mark to the repository', async () => {
		// Arrange
		const { markRepository, command } = setup();
		const newMark = NewMarkMother.one();
		const mark = MarkMother.one();

		markRepository.create.mockResolvedValueOnce(mark);

		// Act
		const result = await command.execute(newMark);

		// Assert
		expect(markRepository.create).toHaveBeenCalledTimes(1);
		expect(markRepository.create).toHaveBeenCalledWith(newMark);
		expect(result).toEqual(mark);
	});

	it('should return repository errors', async () => {
		// Arrange
		const { markRepository, command } = setup();
		const newMark = NewMarkMother.one();
		markRepository.create.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(command.execute(newMark)).rejects.toThrow('boom');
		expect(markRepository.create).toHaveBeenCalledTimes(1);
		expect(markRepository.create).toHaveBeenCalledWith(newMark);
	});
});
