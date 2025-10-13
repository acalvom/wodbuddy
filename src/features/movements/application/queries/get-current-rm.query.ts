import type { Query } from '@/common/application/usecase/query';
import type { Id } from '@/common/domain/interfaces/id';
import type { Mark } from '@/features/marks/domain/entities/mark';
import type { MarksRepository } from '@/features/marks/domain/repositories/marks.repository';

export class GetCurrentRMQuery implements Query<Mark | undefined, Id> {
	constructor(private marksRepository: MarksRepository) {}

	execute(movementId: Id): Promise<Mark | undefined> {
		return this.marksRepository.getCurrentRM(movementId);
	}
}
