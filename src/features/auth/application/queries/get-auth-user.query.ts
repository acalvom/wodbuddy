import type { Query } from '@/common/application/usecase/query';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth.repository';

export class GetAuthUserQuery implements Query<AuthUser | null> {
	constructor(private readonly authRepository: AuthRepository) {}

	execute(): Promise<AuthUser | null> {
		return this.authRepository.getAuthUser();
	}
}
