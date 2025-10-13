import type { Query } from '@/common/application/usecase/query.ts';
import type { Mark } from '../../domain/entities/mark';
import type { MarksRepository } from '../../domain/repositories/marks.repository';

export class GetMarksQuery implements Query<Mark[]> {
	constructor(private markRepository: MarksRepository) {}

	execute(): Promise<Mark[]> {
		return this.markRepository.getAll();
	}
}
