import type { Query } from '@/common/application/usecase/query.ts';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user.ts';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth.repository.ts';

export class GetAuthUserQuery implements Query<AuthUser | null> {
	constructor(private readonly authRepository: AuthRepository) {}

	execute(): Promise<AuthUser | null> {
		return this.authRepository.getAuthUser();
	}
}
