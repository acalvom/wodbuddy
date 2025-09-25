import type { AuthEvent } from '@/features/auth/domain/interfaces/auth-event.ts';

export interface AuthListener {
	onAuthEvent(callback: (event: AuthEvent) => void): Promise<() => void>;
}
