import type { AuthEvent } from '@/features/auth/domain/interfaces/auth-event.ts';
import type { AuthListener } from '@/features/auth/domain/repositories/auth.listener.ts';

// TODO: implementación como Query Command
export class SessionService {
	constructor(private readonly authListener: AuthListener) {}

	subscribeToAuthChanges(callback: (event: AuthEvent) => void) {
		return this.authListener.onAuthEvent(callback);
	}
}
