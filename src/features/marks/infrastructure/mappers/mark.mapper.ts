import { Mark } from "../../domain/entities/mark";
import type { MarkPrimitives } from "../../domain/entities/mark.primitives";
import type { NewMark } from "../../domain/entities/new-mark";
import type { SupabaseMarkDto } from "../dtos/supabase-mark.dto";
import type { SupabaseNewMarkDto } from "../dtos/supabase-new-mark.dto";

export const supabaseToMark = (supabase: SupabaseMarkDto): Mark => {
	const markPrimitives: MarkPrimitives = {
		id: supabase.id,
		value: supabase.value,
		createdOn: supabase.created_at ? new Date(supabase.created_at) : undefined,
		movementId: supabase.movement_id,
		userId: supabase.user_id,
		isPr: supabase.is_pr ?? false,
		isRm: supabase.is_rm ?? false
	};

	return Mark.fromPrimitives(markPrimitives);
};

export const supabaseToMarks = (supabase: SupabaseMarkDto[] | null): Mark[] => {
	if (!supabase) return [];
	return supabase.map((mark) => supabaseToMark(mark));
};

export const newMarkToSupabase = (newMark: NewMark): SupabaseNewMarkDto => {
	return {
		value: newMark.value,
		created_at: newMark.createdOn?.toISOString(),
		movement_id: newMark.movementId,
		user_id: newMark.userId
	};
};
	