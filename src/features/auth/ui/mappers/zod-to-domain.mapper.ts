import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request.ts';
import type { ZodLogin } from '@/features/auth/ui/models/zod-login.ts';

export function zodToDomain({ email, password }: ZodLogin): AuthUserRequest {
	return { email, password };
}
