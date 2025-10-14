import { supabase } from '@/common/infrastructure/supabase-client';
import { AddNewMarkCommand } from '../../application/commands/add-new-mark.command';
import { DeleteMarkCommand } from '../../application/commands/delete-mark.command';
import { GetCurrentPRQuery } from '../../application/queries/get-current-pr.query';
import { GetCurrentRMQuery } from '../../application/queries/get-current-rm.query';
import { GetMarksByMovementQuery } from '../../application/queries/get-marks-by-movement.query';
import { SupabaseMarksRepository } from '../../infrastructure/supabase-marks.repository';

export class MarkLocator {
	private static supabaseClient = supabase;
	private static marksRepository = new SupabaseMarksRepository(MarkLocator.supabaseClient);

	static addNewMarkCommand() {
		return new AddNewMarkCommand(MarkLocator.marksRepository);
	}

	static deleteMarkCommand() {
		return new DeleteMarkCommand(MarkLocator.marksRepository);
	}

	static getMarksByMovementQuery() {
		return new GetMarksByMovementQuery(MarkLocator.marksRepository);
	}

	static getCurrentPRQuery() {
		return new GetCurrentPRQuery(MarkLocator.marksRepository);
	}

	static getCurrentRMQuery() {
		return new GetCurrentRMQuery(MarkLocator.marksRepository);
	}
}
