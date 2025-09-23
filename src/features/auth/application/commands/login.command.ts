import type { Command } from '@/common/application/usecase/command.ts';
import type { AuthUser } from '../../domain/entities/auth-user.ts';
import type { AuthUserRequest } from '../../domain/interfaces/auth-user-request.ts';
import type { AuthRepository } from '../../domain/repositories/auth.repository.ts';

export class LoginCommand implements Command<AuthUserRequest, AuthUser> {
	constructor(private readonly authRepository: AuthRepository) {}

	execute(authUserRequest: AuthUserRequest): Promise<AuthUser> {
		return this.authRepository.login(authUserRequest.email, authUserRequest.password);
	}
}
