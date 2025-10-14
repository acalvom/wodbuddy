import type { Command } from '@/common/application/usecase/command';
import type { Id } from '@/common/domain/interfaces/id';
import type { MarksRepository } from '@/features/marks/domain/repositories/marks.repository';

// TODO: test del command
export class DeleteMarkCommand implements Command<Id, void> {
	constructor(private readonly marksRepository: MarksRepository) {}

	execute(id: Id): Promise<void> {
		return this.marksRepository.delete(id);
	}
}