import { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { MovementPrimitives } from '@/features/movements/domain/primitives/movement.primitives.ts';
import type { SupabaseMovementDto } from '@/features/movements/infrastructure/dtos/supabase-movement.dto.ts';

export const supabaseToMovement = (supabase: SupabaseMovementDto): Movement => {
	const movementPrimitives: MovementPrimitives = {
		id: supabase.id,
		name: supabase.name,
		image: undefined,
		rm: supabase.rm ?? undefined,
		userId: supabase.user_id
	};

	return Movement.fromPrimitives(movementPrimitives);
};

export const supabaseToMovements = (supabase: SupabaseMovementDto[] | null): Movement[] => {
	if (!supabase) return [];
	return supabase.map((movement) => supabaseToMovement(movement));
};
