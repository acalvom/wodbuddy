import type { AuthResponsePassword, UserResponse } from '@supabase/supabase-js';
import { AuthUser } from '@/features/auth/domain/entities/auth-user.ts';
import type { AuthUserPrimitives } from '@/features/auth/domain/interfaces/auth-user-primitives.ts';

export const authResponseToAuthUserMapper = (raw: AuthResponsePassword['data']): AuthUser => {
	const authUserPrimitives: AuthUserPrimitives = {
		id: raw.user?.id ?? '',
		email: raw.user?.email ?? '',
		token: raw.session?.access_token ?? '',
		createdAt: raw.user?.created_at ?? ''
	};

	return AuthUser.fromPrimitives(authUserPrimitives);
};

export const userResponseToAuthUserMapper = (raw: UserResponse['data']): AuthUser | null => {
	if (!raw.user) return null;

	const authUserPrimitives: AuthUserPrimitives = {
		id: raw.user?.id ?? '',
		email: raw.user?.email ?? '',
		token: '',
		createdAt: raw.user?.created_at ?? ''
	};

	return AuthUser.fromPrimitives(authUserPrimitives);
};
