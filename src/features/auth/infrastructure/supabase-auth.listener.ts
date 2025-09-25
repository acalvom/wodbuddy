import type { SupabaseClient } from '@supabase/supabase-js';
import type { AuthEvent } from '@/features/auth/domain/interfaces/auth-event.ts';

export class SupabaseAuthListener {
	constructor(private readonly supabase: SupabaseClient) {}

	async onAuthEvent(callback: (event: AuthEvent) => void) {
		const { data: subscription } = this.supabase.auth.onAuthStateChange((event) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') callback(event as AuthEvent);
		});
		return () => subscription.subscription.unsubscribe();
	}
}
