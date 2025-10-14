import type { Command } from '@/common/application/usecase/command';
import type { AuthUser } from '../../domain/entities/auth-user';
import type { AuthUserRequest } from '../../domain/interfaces/auth-user-request';
import type { AuthRepository } from '../../domain/repositories/auth.repository';

export class LoginCommand implements Command<AuthUserRequest, AuthUser> {
	constructor(private readonly authRepository: AuthRepository) {}

	execute(authUserRequest: AuthUserRequest): Promise<AuthUser> {
		return this.authRepository.login(authUserRequest.email, authUserRequest.password);
	}
}
