import type { Query } from '@/common/application/usecase/query.ts';
import type { Id } from '@/common/domain/interfaces/id';
import type { Mark } from '../../domain/entities/mark';
import type { MarksRepository } from '../../domain/repositories/marks.repository';

export class GetMarksByMovementQuery implements Query<Mark[], Id> {
	constructor(private markRepository: MarksRepository) {}

	execute(movementId: Id): Promise<Mark[]> {
		return this.markRepository.getByMovementId(movementId);
	}
}
