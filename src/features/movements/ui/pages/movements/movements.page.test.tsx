import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseAuthHookInteractor, UseAuthHookTO } from '@/features/auth/ui/hooks/use-auth-hook-to';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother';
import { MovementsListComponentTO } from '@/features/movements/ui/components/movements-list/movements-list.component.to';
import { renderAppWithRoutes } from '@/test/test-utils';

vi.mock('@/features/movements/ui/controllers/use-get-movements.hook');
vi.mock('@/features/auth/ui/hooks/use-auth.hook');

import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook';
import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook';

const mockUseGetMovements = vi.mocked(useGetMovements);
const mockUseAuth = vi.mocked(useAuth);

describe('MovementsPage', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mockUseAuth.mockReturnValue(UseAuthHookTO.loggedIn());
	});

	it('should show loading state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.loading());
		renderAppWithRoutes('/');
		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('should show error state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.error());
		renderAppWithRoutes('/');
		expect(screen.getByText('Error loading movements')).toBeInTheDocument();
	});

	it('should show empty movement list', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());
		renderAppWithRoutes('/');
		expect(screen.getByText('No movements to show')).toBeInTheDocument();
	});

	it('should show list, create button and card details', () => {
		const movement = MovementMother.one();
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withOneMovement(movement));
		renderAppWithRoutes('/');

		expect(screen.getByRole('button', { name: /añadir movimiento/i })).toBeInTheDocument();
		expect(screen.getByText(movement.name)).toBeInTheDocument();
		expect(screen.getByText(`RM: ${movement.rm} kg`)).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /ver detalle/i })).toBeInTheDocument();
	});

	it('should navigate to create movement page when clicking create button', async () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());
		renderAppWithRoutes('/');

		fireEvent.click(screen.getByRole('button', { name: /añadir movimiento/i }));

		await waitFor(() => {
			expect(screen.getByText(/nuevo movimiento/i)).toBeInTheDocument();
		});
	});

	it('should navigate to movement detail when clicking view detail button', async () => {
		const movement = MovementMother.one({ rm: 20 });
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withOneMovement(movement));
		renderAppWithRoutes('/');

		fireEvent.click(screen.getByRole('button', { name: /ver detalle/i }));

		await waitFor(() => {
			expect(screen.getByText(/movement detail/i)).toBeInTheDocument();
		});
	});

	it('should not render when user is not authenticated', () => {
		mockUseAuth.mockReturnValue(UseAuthHookTO.loggedOut());
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());
		renderAppWithRoutes('/');

		UseAuthHookInteractor.expectLoginFormInDocument();
	});
});
