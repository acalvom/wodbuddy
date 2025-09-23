import { createClient } from '@supabase/supabase-js';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user.ts';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth.repository.ts';
import {
	authResponseToAuthUserMapper,
	userResponseToAuthUserMapper
} from '@/features/auth/infrastructure/mappers/auth-user.mapper.ts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
const supabase = createClient(supabaseUrl, supabasePublishableKey);

export class SupabaseAuthRepository implements AuthRepository {
	async signup(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error || !data.user) throw new Error(error?.message || 'Signup failed');
		return authResponseToAuthUserMapper(data);
	}

	async login(email: string, password: string): Promise<AuthUser> {
		const { data, error } = await supabase.auth.signInWithPassword({ email, password });
		if (error || !data.user) throw new Error(error?.message || 'Login failed');
		return authResponseToAuthUserMapper(data);
	}

	async logout(): Promise<void> {
		await supabase.auth.signOut();
	}

	async getCurrentUser(): Promise<AuthUser | null> {
		const { data } = await supabase.auth.getUser();
		return userResponseToAuthUserMapper(data);
	}
}
