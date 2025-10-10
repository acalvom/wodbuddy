import { fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UseAuthHookInteractor, UseAuthHookTO } from '@/features/auth/ui/hooks/use-auth-hook-to.ts';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother';
import { renderAppWithRoutes } from '@/test/test-utils';

vi.mock('@/features/movements/ui/controllers/use-get-movement.hook');
vi.mock('@/features/auth/ui/hooks/use-auth.hook');

import { Parser } from '@/common/domain/parser/parser';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook.ts';
import { ViewMovementPageInteractor, ViewMovementPageTO } from './percentage-calculator-section/view-movement.page.to';

const mockUseGetMovement = vi.mocked(useGetMovement);
const mockUseAuth = vi.mocked(useAuth);

describe('ViewMovementPage', () => {
	const mockMovementId = '1';
	const testMovement = MovementMother.one({
		id: 1,
		name: 'Snatch',
		rm: 100
	});

	beforeEach(() => {
		vi.clearAllMocks();
		mockUseAuth.mockReturnValue(UseAuthHookTO.loggedIn());
	});

	describe('Authentication', () => {
		it('should not render when user is not authenticated', () => {
			mockUseAuth.mockReturnValue(UseAuthHookTO.loggedOut());
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));

			renderAppWithRoutes(`/movements/${mockMovementId}`);

			UseAuthHookInteractor.expectLoginFormInDocument();
		});
	});

	describe('Loading States', () => {
		it('should show loading state while fetching movement', () => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.loading());

			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(screen.getByTestId('loading')).toBeInTheDocument();
		});

		it('should show error state when movement fetch fails', () => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.error());

			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(screen.getByText('Error cargando movimiento')).toBeInTheDocument();
		});

		it('should show not found message when movement does not exist', () => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.notFound());

			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectMovementNotFound();
		});
	});

	describe('Movement Display', () => {
		beforeEach(() => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));
		});

		it('should render movement details correctly', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectMovementDetails(testMovement);
		});

		it('should display PR (Personal Record) information when available', () => {
			// TODO: setear PR mockeado es 75kg en los datos simulados
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(screen.getByText(`Tu PR: 75 kg`)).toBeInTheDocument();
		});

		it('should render all main sections', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectMovementDetails(testMovement);
			ViewMovementPageInteractor.expectMarkHistory();
			ViewMovementPageInteractor.expectPercentageCalculator();
		});
	});

	describe('Navigation Buttons', () => {
		beforeEach(() => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));
		});

		it('should render Add RM button', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectAddRMButton();
		});

		it('should render Back button', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectBackButton();
		});

		it('should navigate to add mark page when clicking Add RM button', async () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			await ViewMovementPageInteractor.clickAddRMButton();

			await waitFor(() => {
				// Verificar que aparece contenido de la página de añadir marca
				expect(screen.getByText('¿Peso?')).toBeInTheDocument();
				expect(screen.getByText('¿Cuándo?')).toBeInTheDocument();
				expect(screen.getByRole('button', { name: /añadir marca/i })).toBeInTheDocument();
			});
		});

		it('should navigate back to movements list when clicking Back button', async () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			await ViewMovementPageInteractor.clickBackButton();

			await waitFor(() => {
				// Verificar que aparece contenido de la página de movimientos
				expect(screen.getByRole('button', { name: /añadir movimiento/i })).toBeInTheDocument();
			});
		});
	});

	describe('Mark History', () => {
		beforeEach(() => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));
		});

		it('should display all marks from mock data', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			// Verificar marcas mockeadas
			expect(screen.getByText('70 kg')).toBeInTheDocument(); // Primera marca
			expect(screen.getByText('75 kg')).toBeInTheDocument(); // Segunda marca (PR)
			expect(screen.getByText('72 kg')).toBeInTheDocument(); // Tercera marca
		});

		it('should display mark dates correctly', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(screen.getAllByText(/01\/10\/2025/).length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/01\/11\/2025/).length).toBeGreaterThanOrEqual(1);
			expect(screen.getAllByText(/01\/12\/2025/).length).toBeGreaterThanOrEqual(1);
		});
	});

	describe('Percentage Calculator', () => {
		beforeEach(() => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));
		});

		it('should render percentage calculator form', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			ViewMovementPageInteractor.expectPercentageCalculator();
			// Buscar el botón de calcular porcentaje por su aria-label
			expect(screen.getByRole('button', { name: /calcular porcentaje/i })).toBeInTheDocument();
		});

		it('should calculate percentage correctly when valid percentage is entered', async () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			const percentageInput = screen.getByPlaceholderText('50, 65, 80...');
			const calculateButton = screen.getByRole('button', { name: /calcular porcentaje/i });

			fireEvent.change(percentageInput, { target: { value: '80' } });
			fireEvent.click(calculateButton);

			await waitFor(() => {
				expect(screen.getByText('80% = 80 kg')).toBeInTheDocument();
			});
		});

		it('should show validation error for invalid percentage input', async () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			const percentageInput = screen.getByPlaceholderText('50, 65, 80...');
			const calculateButton = screen.getByRole('button', { name: /calcular porcentaje/i });

			fireEvent.change(percentageInput, { target: { value: 'invalid' } });
			fireEvent.click(calculateButton);

			await waitFor(() => {
				expect(screen.getByText(/solo números enteros/i)).toBeInTheDocument();
			});
		});
	});

	describe('URL Parameters', () => {
		it('should handle invalid movement ID parameter', () => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.notFound());

			renderAppWithRoutes('/movements/invalid-id');

			ViewMovementPageInteractor.expectMovementNotFound();
		});

		it('should parse movement ID correctly from URL', () => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));

			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(mockUseGetMovement).toHaveBeenCalledWith(Parser.toInt(mockMovementId));
		});
	});

	describe('Responsive Design', () => {
		beforeEach(() => {
			mockUseGetMovement.mockReturnValue(ViewMovementPageTO.withMovement(testMovement));
		});

		it('should render with proper mobile styling classes', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			const addButton = screen.getByRole('button', { name: /añadir rm/i });
			expect(addButton).toHaveClass('w-full', 'max-w-xs', 'mx-auto');
		});

		it('should render card layout correctly', () => {
			renderAppWithRoutes(`/movements/${mockMovementId}`);

			expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
			expect(screen.getByRole('button', { name: /añadir rm/i })).toBeInTheDocument();
		});
	});
});
