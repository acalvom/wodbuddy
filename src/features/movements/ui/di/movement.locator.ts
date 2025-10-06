import { supabase } from '@/common/infrastructure/supabase-client.ts';
import { AddNewMovementCommand } from '@/features/movements/application/commands/add-new-movement.command.ts';
import { GetMovementsQuery } from '@/features/movements/application/queries/get-movements.query.ts';
import { SupabaseMovementsRepository } from '@/features/movements/infrastructure/supabase-movements.repository.ts';

export class MovementLocator {
	private static supabaseClient = supabase;
	private static movementsRepository = new SupabaseMovementsRepository(MovementLocator.supabaseClient);

	static getMovements() {
		return new GetMovementsQuery(MovementLocator.movementsRepository);
	}

	static addNewMovement() {
		return new AddNewMovementCommand(MovementLocator.movementsRepository);
	}
}
