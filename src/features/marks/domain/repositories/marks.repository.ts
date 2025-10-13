import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Mark } from '../entities/mark';
import type { NewMark } from '../entities/new-mark';

export interface MarksRepository {
	getAll(): Promise<Mark[]>;
	getById(id: Id): Promise<Mark | undefined>;
	create(newMark: NewMark): Promise<Mark>;
	getByMovementId(movementId: Id, userId: string): Promise<Mark[]>;
	getCurrentPR(movementId: Id, userId: string): Promise<Mark | undefined>;
	getCurrentRM(movementId: Id, userId: string): Promise<Mark | undefined>;
}
