export interface SupabaseMarkDto {
	id: number;
	value: number;
	is_pr: boolean | null;
	is_rm: boolean | null;
	created_at: string;
	movement_id: number;
	user_id: string;
}
