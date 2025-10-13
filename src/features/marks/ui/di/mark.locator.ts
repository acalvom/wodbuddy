import { supabase } from '@/common/infrastructure/supabase-client';
import { AddNewMarkCommand } from '../../application/commands/add-new-mark.command';
import { GetMarksQuery } from '../../application/queries/get-marks.query';
import { SupabaseMarksRepository } from '../../infrastructure/supabase-marks.repository';

export class MarkLocator {
	private static supabaseClient = supabase;
	private static marksRepository = new SupabaseMarksRepository(MarkLocator.supabaseClient);

	static getMarksQuery() {
		return new GetMarksQuery(MarkLocator.marksRepository);
	}

	static addNewMarkCommand() {
		return new AddNewMarkCommand(MarkLocator.marksRepository);
	}
}
