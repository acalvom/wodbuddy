import { screen } from '@testing-library/react';
import { expect, vi } from 'vitest';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request';

type UseAuthHookTOType = {
	user: AuthUser | null | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;
	onLogin: (loginRequest: AuthUserRequest) => Promise<void>;
	onLogout: () => Promise<void>;
	error: Error | null;
};

export class UseAuthHookTO {
	private static base(result: Partial<UseAuthHookTOType>) {
		return {
			user: null,
			isAuthenticated: false,
			onLogin: vi.fn(),
			onLogout: vi.fn(),
			onSignup: vi.fn(),
			...result
		} as UseAuthHookTOType;
	}

	static loggedIn() {
		return this.base({
			user: {
				id: 'test-user-id',
				email: 'test@example.com',
				createdAt: new Date(),
				token: ''
			},
			isAuthenticated: true
		});
	}

	static loggedOut() {
		return this.base({ user: null, isAuthenticated: false });
	}
}

export class UseAuthHookInteractor {
	static expectLoginFormInDocument() {
		expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
		expect(screen.getByText('Email')).toBeInTheDocument();
		expect(screen.getByText('Contraseña')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
		expect(screen.getByText('Regístrate')).toBeInTheDocument();
	}
}
