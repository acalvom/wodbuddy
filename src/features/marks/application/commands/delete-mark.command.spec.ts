import { mock } from 'vitest-mock-extended';
import type { MarksRepository } from '../../domain/repositories/marks.repository';
import { DeleteMarkCommand } from './delete-mark.command';

describe('DeleteMarkCommand', () => {
	afterEach(() => vi.clearAllMocks());

	const setup = () => {
		const markRepository = mock<MarksRepository>();
		const command = new DeleteMarkCommand(markRepository);
		return { markRepository, command };
	};

	it('should delete a mark from the repository', async () => {
		// Arrange
		const { markRepository, command } = setup();
		const markId = 1;

		markRepository.delete.mockResolvedValueOnce(undefined);

		// Act
		const result = await command.execute(markId);

		// Assert
		expect(markRepository.delete).toHaveBeenCalledTimes(1);
		expect(markRepository.delete).toHaveBeenCalledWith(markId);
		expect(result).toBeUndefined();
	});

	it('should return repository errors', async () => {
		// Arrange
		const { markRepository, command } = setup();
		const markId = 1;
		markRepository.delete.mockRejectedValueOnce(new Error('boom'));

		// Act + Assert
		await expect(command.execute(markId)).rejects.toThrow('boom');
		expect(markRepository.delete).toHaveBeenCalledTimes(1);
		expect(markRepository.delete).toHaveBeenCalledWith(markId);
	});
});
