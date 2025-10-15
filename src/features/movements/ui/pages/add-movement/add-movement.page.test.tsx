import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseAuthHookInteractor, UseAuthHookTO } from '@/features/auth/ui/hooks/use-auth.hook.to';
import {
	AddMovementPageInteractor,
	AddMovementPageTO
} from '@/features/movements/ui/pages/add-movement/add-movement.page.to';
import { renderAppWithRoutes, screen, waitFor } from '@/test/test-utils';

vi.mock('@/features/movements/ui/controllers/use-add-new-movement.hook');
vi.mock('@/features/auth/ui/hooks/use-auth.hook');

import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook';
import { useAddNewMovement } from '@/features/movements/ui/controllers/use-add-new-movement.hook';

const mockUseAddNewMovement = vi.mocked(useAddNewMovement);
const mockUseAuth = vi.mocked(useAuth);

describe('AddMovementPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseAuth.mockReturnValue(UseAuthHookTO.loggedIn());
		mockUseAddNewMovement.mockReturnValue(AddMovementPageTO.custom({}));
	});

	it('should render the form correctly', () => {
		renderAppWithRoutes('/add-movement');

		expect(screen.getByText('Nuevo Movimiento')).toBeInTheDocument();
		expect(screen.getByLabelText('Nombre del movimiento')).toBeInTheDocument();
		expect(screen.getByLabelText('RM (Repetición Máxima)')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /añadir movimiento/i })).toBeInTheDocument();
	});

	it('should show loading state on button when isPending is true', () => {
		mockUseAddNewMovement.mockReturnValue(AddMovementPageTO.loading());

		renderAppWithRoutes('/add-movement');

		const submitButton = screen.getByRole('button', { name: /añadir movimiento/i });
		expect(submitButton).toBeDisabled();
	});

	it('should validate required fields (empty form)', async () => {
		const user = userEvent.setup();
		renderAppWithRoutes('/add-movement');

		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));

		await waitFor(() => {
			expect(screen.getByText('Mínimo 3 caracteres')).toBeInTheDocument();
			expect(screen.getByText('El RM es obligatorio')).toBeInTheDocument();
		});
	});

	it('should validate name field minimum length', async () => {
		const user = userEvent.setup();
		renderAppWithRoutes('/add-movement');

		await user.type(screen.getByLabelText('Nombre del movimiento'), 'AB');
		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));

		await waitFor(() => {
			expect(screen.getByText('Mínimo 3 caracteres')).toBeInTheDocument();
		});
	});

	it('should validate RM field format (invalid RM type)', async () => {
		const user = userEvent.setup();
		renderAppWithRoutes('/add-movement');

		await user.type(screen.getByLabelText('Nombre del movimiento'), 'Sentadilla');
		await user.type(screen.getByLabelText('RM (Repetición Máxima)'), 'abc');
		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));

		await waitFor(() => {
			expect(screen.getByText('Debe ser un número válido (ej: 100.5)')).toBeInTheDocument();
		});
	});

	it('should validate RM field positive number (RM = 0)', async () => {
		const user = userEvent.setup();
		renderAppWithRoutes('/add-movement');

		await user.type(screen.getByLabelText('Nombre del movimiento'), 'Sentadilla');
		await user.type(screen.getByLabelText('RM (Repetición Máxima)'), '0');
		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));

		await waitFor(() => {
			expect(screen.getByText('Debe ser mayor que 0')).toBeInTheDocument();
		});
	});

	it('should show correct placeholder texts', () => {
		renderAppWithRoutes('/add-movement');

		expect(screen.getByPlaceholderText('Snatch, Clean ...')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('100.5 kg')).toBeInTheDocument();
	});

	it('should have correct input modes for mobile', () => {
		renderAppWithRoutes('/add-movement');

		const rmInput = screen.getByLabelText('RM (Repetición Máxima)');
		expect(rmInput).toHaveAttribute('inputMode', 'decimal');
	});

	it('should clear field errors when user starts typing', async () => {
		const user = userEvent.setup();
		renderAppWithRoutes('/add-movement');

		await user.click(screen.getByRole('button', { name: /añadir movimiento/i }));
		await waitFor(() => {
			expect(screen.getByText('Mínimo 3 caracteres')).toBeInTheDocument();
		});

		await user.type(screen.getByLabelText('Nombre del movimiento'), 'Sentadilla');
		await waitFor(() => {
			expect(screen.queryByText('Mínimo 3 caracteres')).not.toBeInTheDocument();
		});
	});

	it('should handle form submission successfully', async () => {
		const mockMutateAsync = vi.fn().mockResolvedValue({ success: true });
		mockUseAddNewMovement.mockReturnValue(AddMovementPageTO.withMutateAsync(mockMutateAsync));

		renderAppWithRoutes('/add-movement');

		await AddMovementPageInteractor.fillValidForm();
		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledTimes(1);
		});
	});

	it('should handle submission error', async () => {
		mockUseAddNewMovement.mockReturnValue(AddMovementPageTO.error(new Error('Network error')));
		renderAppWithRoutes('/add-movement');

		await AddMovementPageInteractor.fillValidForm();

		await waitFor(() => {
			expect(screen.getByRole('alert')).toHaveTextContent('Network error');
		});
	});

	it('should handle mutateAsync rejects', async () => {
		const mockMutateAsync = vi.fn().mockRejectedValue(new Error('Network error'));
		mockUseAddNewMovement.mockReturnValue(AddMovementPageTO.withMutateAsync(mockMutateAsync));

		renderAppWithRoutes('/add-movement');

		await AddMovementPageInteractor.fillValidForm();

		await waitFor(() => {
			expect(mockMutateAsync).toHaveBeenCalledTimes(1);
		});
		await expect(mockMutateAsync()).rejects.toThrow('Network error');
	});

	it('should not submit when user is not authenticated', async () => {
		mockUseAuth.mockReturnValue(UseAuthHookTO.loggedOut());
		renderAppWithRoutes('/add-movement');
		UseAuthHookInteractor.expectLoginFormInDocument();
	});
});
