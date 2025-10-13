import type { Command } from '@/common/application/usecase/command.ts';
import type { Mark } from '../../domain/entities/mark';
import type { NewMark } from '../../domain/entities/new-mark';
import type { MarksRepository } from '../../domain/repositories/marks.repository';

export class AddNewMarkCommand implements Command<NewMark, Mark> {
	constructor(private readonly movementRepository: MarksRepository) {}

	execute(newMark: NewMark): Promise<Mark> {
		return this.movementRepository.create(newMark);
	}
}
