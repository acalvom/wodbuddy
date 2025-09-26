import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user.ts';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth.repository.ts';
import {
	authResponseToAuthUserMapper,
	userResponseToAuthUserMapper
} from '@/features/auth/infrastructure/mappers/auth-user.mapper.ts';

export class SupabaseAuthRepository implements AuthRepository {
	constructor(private readonly supabase: SupabaseClient) {}

	async signup(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await this.supabase.auth.signUp({ email, password });
		if (error || !data.user) throw new Error(error?.message || 'Signup failed');
		return authResponseToAuthUserMapper(data);
	}

	async login(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
		if (error || !data.user) throw new Error(error?.message || 'Login failed');
		return authResponseToAuthUserMapper(data);
	}

	async logout(): Promise<void> {
		const { error } = await this.supabase.auth.signOut();
		if (error) throw new Error(error.message);
	}

	async getAuthUser(): Promise<AuthUser | null> {
		const { data } = await this.supabase.auth.getUser();
		return userResponseToAuthUserMapper(data);
	}
}
