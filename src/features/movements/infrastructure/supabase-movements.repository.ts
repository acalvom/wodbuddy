import type { SupabaseClient } from '@supabase/supabase-js';
import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Movement } from '@/features/movements/domain/entities/movement.ts';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';
import type { MovementRepository } from '@/features/movements/domain/repositories/movement.repository.ts';
import {
	newMovementToSupabase,
	supabaseToMovement,
	supabaseToMovements
} from '@/features/movements/infrastructure/mappers/movement.mapper.ts';

export class SupabaseMovementsRepository implements MovementRepository {
	constructor(private readonly supabase: SupabaseClient) {}

	async getAll(): Promise<Movement[]> {
		const { data, error } = await this.supabase.from('movements').select('*');

		if (error) throw new Error(error.message);

		return supabaseToMovements(data);
	}

	async getById(id: Id): Promise<Movement | undefined> {
		const { data, error } = await this.supabase.from('movements').select().eq('id', id).single();

		if (error) throw new Error(error.message);

		return supabaseToMovement(data);
	}

	async create(newMovement: NewMovement): Promise<void> {
		const supabaseNewMovement = newMovementToSupabase(newMovement);
		const { error } = await this.supabase.from('movements').insert(supabaseNewMovement);

		if (error) throw new Error(error.message);
	}
}
