import { supabase } from '@/common/infrastructure/supabase-client';
import { AddNewMovementCommand } from '@/features/movements/application/commands/add-new-movement.command';
import { GetMovementByIdQuery } from '@/features/movements/application/queries/get-movement-by-id.query';
import { GetMovementsQuery } from '@/features/movements/application/queries/get-movements.query';
import { SupabaseMovementsRepository } from '@/features/movements/infrastructure/supabase-movements.repository';

export class MovementLocator {
	private static supabaseClient = supabase;
	private static movementsRepository = new SupabaseMovementsRepository(MovementLocator.supabaseClient);

	static getMovements() {
		return new GetMovementsQuery(MovementLocator.movementsRepository);
	}

	static getMovementById() {
		return new GetMovementByIdQuery(MovementLocator.movementsRepository);
	}

	static addNewMovement() {
		return new AddNewMovementCommand(MovementLocator.movementsRepository);
	}
}
