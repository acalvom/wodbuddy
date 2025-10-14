import type { Command } from '@/common/application/usecase/command';
import type { AuthRepository } from '@/features/auth/domain/repositories/auth.repository';

export class LogoutCommand implements Command {
	constructor(private readonly authRepository: AuthRepository) {}

	execute(): Promise<void> {
		return this.authRepository.logout();
	}
}
