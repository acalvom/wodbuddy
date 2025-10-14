import { Movement } from '@/features/movements/domain/entities/movement';
import type { MovementPrimitives } from '@/features/movements/domain/entities/movement.primitives';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement';
import type { SupabaseMovementDto } from '@/features/movements/infrastructure/dtos/supabase-movement.dto';
import type { SupabaseNewMovementDto } from '@/features/movements/infrastructure/dtos/supabase-new-movement.dto';

export const supabaseToMovement = (supabase: SupabaseMovementDto): Movement => {
	const movementPrimitives: MovementPrimitives = {
		id: supabase.id,
		name: supabase.name,
		rm: supabase.rm ?? undefined,
		userId: supabase.user_id
	};

	return Movement.fromPrimitives(movementPrimitives);
};

export const supabaseToMovements = (supabase: SupabaseMovementDto[] | null): Movement[] => {
	if (!supabase) return [];
	return supabase.map((movement) => supabaseToMovement(movement));
};

export const newMovementToSupabase = (newMovement: NewMovement): SupabaseNewMovementDto => {
	return {
		name: newMovement.name,
		rm: newMovement.rm,
		user_id: newMovement.userId,
	};
};
