import { vi } from 'vitest';
import type { UseMutation } from '@/common/ui/react-query/mutation-wrapper/use-mutation-wrapper';
import type { NewMovement } from '@/features/movements/domain/entities/new-movement';
import { screen, userEvent } from '@/test/test-utils';

type AddNewMovementPageTOType = UseMutation<void, Error, NewMovement, unknown>;

export class AddMovementPageTO {
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
}

export class AddMovementPageInteractor {
	static async fillValidForm() {
		const user = userEvent.setup();
		await user.type(screen.getByLabelText('Nombre del movimiento'), 'Sentadilla');
		await user.type(screen.getByLabelText('RM (Repetición Máxima)'), '120.5');
		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));
	}
}
