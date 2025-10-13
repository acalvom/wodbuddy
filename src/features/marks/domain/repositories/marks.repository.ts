import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Mark } from '../entities/mark';
import type { NewMark } from '../entities/new-mark';

export interface MarksRepository {
	getById(id: Id): Promise<Mark | undefined>;
	create(newMark: NewMark): Promise<Mark>;
	getByMovementId(movementId: Id): Promise<Mark[]>;
	getCurrentPR(movementId: Id): Promise<Mark | undefined>;
	getCurrentRM(movementId: Id): Promise<Mark | undefined>;
}
