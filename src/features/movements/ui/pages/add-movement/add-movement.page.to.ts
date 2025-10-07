import { vi } from 'vitest';
import type { UseMutation } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper.tsx';
import type { AuthUser } from '@/features/auth/domain/entities/auth-user.ts';
import type { AuthUserRequest } from '@/features/auth/domain/interfaces/auth-user-request.ts';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement.ts';
import { screen, userEvent } from '@/test/test-utils.tsx';

type AddNewMovementPageTOType = UseMutation<void, Error, NewMovement, unknown>;

// TODO: move to auth TO file
type LoginTOType = {
	user: AuthUser | null | undefined;
	isAuthenticated: boolean;
	isLoading: boolean;
	onLogin: (loginRequest: AuthUserRequest) => Promise<void>;
	onLogout: () => Promise<void>;
	error: Error | null;
};

export class AddMovementPageTO {
	private static authBase(result: Partial<LoginTOType>) {
		return {
			user: null,
			isAuthenticated: false,
			onLogin: vi.fn(),
			onLogout: vi.fn(),
			onSignup: vi.fn(),
			...result
		} as LoginTOType;
	}

	static custom(result: Partial<AddNewMovementPageTOType>) {
		return {
			mutateAsync: vi.fn(),
			isPending: false,
			isError: false,
			error: null,
			...result
		} as AddNewMovementPageTOType;
	}

	static loading() {
		return this.custom({ isPending: true });
	}

	static error(error: Error) {
		return this.custom({ isError: true, error });
	}

	static withMutateAsync(mutateAsync: (input: NewMovement) => Promise<void>) {
		return this.custom({ mutateAsync });
	}

	static loggedIn() {
		return this.authBase({
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
		return this.authBase({ user: null, isAuthenticated: false });
	}
}

export class AddMovementPageInteractor {
	static async fillValidForm() {
		const user = userEvent.setup();
		await user.type(screen.getByLabelText('Nombre del movimiento'), 'Sentadilla');
		await user.type(screen.getByLabelText('RM (Repetición Máxima)'), '120.5');
		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));
	}
}
