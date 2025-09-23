import { LoginCommand } from '@/features/auth/application/commands/login.command.ts';
import { LogoutCommand } from '@/features/auth/application/commands/logout.command.ts';
import { SignupCommand } from '@/features/auth/application/commands/signup.command.ts';
import { GetCurrentUserQuery } from '@/features/auth/application/queries/get-current-user.query.ts';
import { SupabaseAuthRepository } from '@/features/auth/infrastructure/supabase-auth.repository.ts';

export class AuthLocator {
	static supabaseAuthRepository = new SupabaseAuthRepository();

	static signupCommand() {
		return new SignupCommand(AuthLocator.supabaseAuthRepository);
	}

	static loginCommand() {
		return new LoginCommand(AuthLocator.supabaseAuthRepository);
	}

	static logoutCommand() {
		return new LogoutCommand(AuthLocator.supabaseAuthRepository);
	}

	static getCurrentUserQuery() {
		return new GetCurrentUserQuery(AuthLocator.supabaseAuthRepository);
	}
}
