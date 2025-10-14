import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request';
import type { ZodLogin } from '@/features/auth/ui/models/zod-login';

export function zodToDomain({ email, password }: ZodLogin): AuthUserRequest {
	return { email, password };
}
