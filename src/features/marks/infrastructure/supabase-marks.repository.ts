import type { SupabaseClient } from '@supabase/supabase-js';
import type { Id } from '@/common/domain/interfaces/id.ts';
import type { Mark } from '../domain/entities/mark';
import type { NewMark } from '../domain/entities/new-mark';
import type { MarksRepository } from '../domain/repositories/marks.repository';
import { newMarkToSupabase, supabaseToMark, supabaseToMarks } from './mappers/mark.mapper';

export class SupabaseMarksRepository implements MarksRepository {
	constructor(private readonly supabase: SupabaseClient) {}

	async getAll(): Promise<Mark[]> {
		const { data, error } = await this.supabase.from('marks').select('*');

		if (error) throw new Error(error.message);

		return supabaseToMarks(data);
	}

	async getById(id: Id): Promise<Mark | undefined> {
		const { data, error } = await this.supabase.from('marks').select().eq('id', id).single();

		if (error) throw new Error(error.message);

		return supabaseToMark(data);
	}

	async create(newMark: NewMark): Promise<Mark> {
		const supabaseNewMark = newMarkToSupabase(newMark);

		const { data, error } = await this.supabase.from('marks').insert(supabaseNewMark).select().single();

		if (error) throw new Error(error.message);

		// Los flags is_pr e is_rm se actualizan automáticamente por el trigger de Supabase
		return supabaseToMark(data);
	}

	async getByMovementId(movementId: Id, userId: string): Promise<Mark[]> {
		const { data, error } = await this.supabase
			.from('marks')
			.select('*')
			.eq('movement_id', movementId)
			.eq('user_id', userId)
			.order('created_at', { ascending: false });

		if (error) throw new Error(error.message);

		return supabaseToMarks(data);
	}

	async getCurrentPR(movementId: Id, userId: string): Promise<Mark | undefined> {
		const { data, error } = await this.supabase
			.from('marks')
			.select('*')
			.eq('movement_id', movementId)
			.eq('user_id', userId)
			.eq('is_pr', true)
			.single();

		if (error && error.code !== 'PGRST116') {
			// PGRST116 = not found
			throw new Error(error.message);
		}

		return data ? supabaseToMark(data) : undefined;
	}

	async getCurrentRM(movementId: Id, userId: string): Promise<Mark | undefined> {
		const { data, error } = await this.supabase
			.from('marks')
			.select('*')
			.eq('movement_id', movementId)
			.eq('user_id', userId)
			.eq('is_rm', true)
			.single();

		if (error && error.code !== 'PGRST116') {
			//TODO PGRST116 = not found : Crear error NotFound
			throw new Error(error.message);
		}

		return data ? supabaseToMark(data) : undefined;
	}
}
