import type { AuthUser } from '../entities/auth-user.ts';

export interface AuthRepository {
	signup(email: string, password: string): Promise<AuthUser>;
	login(email: string, password: string): Promise<AuthUser>;
	logout(): Promise<void>;
	getAuthUser(): Promise<AuthUser | null>;
}
