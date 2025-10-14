import { supabase } from '@/common/infrastructure/supabase-client';
import { LoginCommand } from '@/features/auth/application/commands/login.command';
import { LogoutCommand } from '@/features/auth/application/commands/logout.command';
import { SignupCommand } from '@/features/auth/application/commands/signup.command';
import { GetAuthUserQuery } from '@/features/auth/application/queries/get-auth-user.query';
import { SessionService } from '@/features/auth/application/services/session.service';
import { SupabaseAuthListener } from '@/features/auth/infrastructure/supabase-auth.listener';
import { SupabaseAuthRepository } from '@/features/auth/infrastructure/supabase-auth.repository';

export class AuthLocator {
	private static supabaseClient = supabase;
	static supabaseAuthRepository = new SupabaseAuthRepository(this.supabaseClient);
	static supabaseAuthListener = new SupabaseAuthListener(this.supabaseClient);

	static signupCommand() {
		return new SignupCommand(AuthLocator.supabaseAuthRepository);
	}

	static loginCommand() {
		return new LoginCommand(AuthLocator.supabaseAuthRepository);
	}

	static logoutCommand() {
		return new LogoutCommand(AuthLocator.supabaseAuthRepository);
	}

	static getAuthUserQuery() {
		return new GetAuthUserQuery(AuthLocator.supabaseAuthRepository);
	}

	static sessionService() {
		return new SessionService(AuthLocator.supabaseAuthListener);
	}
}
