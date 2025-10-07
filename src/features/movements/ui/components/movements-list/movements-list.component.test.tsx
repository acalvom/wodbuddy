import { describe, expect, it, vi } from 'vitest';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother';
import { MovementsListComponentTO } from '@/features/movements/ui/components/movements-list/movements-list.component.to';
import { MovementsList } from '@/features/movements/ui/components/movements-list/movements-list.component';
import { renderWithRouting, screen } from '@/test/test-utils';

vi.mock('@/features/movements/ui/controllers/use-get-movements.hook');

import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook';

const mockUseGetMovements = vi.mocked(useGetMovements);

describe('MovementsList', () => {
	it('should show loading state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.loading());

		renderWithRouting(<MovementsList />);

		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('should show error state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.error());

		renderWithRouting(<MovementsList />);

		expect(screen.getByText('Error loading movements')).toBeInTheDocument();
	});

	it('should show empty state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());

		renderWithRouting(<MovementsList />);

		expect(screen.getByText('No movements to show')).toBeInTheDocument();
	});

	it('should show one movement with all percentage values and formatted RM', () => {
		const movement = MovementMother.one({ rm: 20 });
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withOneMovement(movement));

		renderWithRouting(<MovementsList />);

		expect(screen.getByText(movement.name)).toBeInTheDocument();
		expect(screen.getByText(`RM: ${movement.rm} kg`)).toBeInTheDocument();

		const percentages = [50, 60, 70, 80, 85, 90, 95, 100];
		for (const percentage of percentages) {
			expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
			expect(screen.getByText(`${movement.formatPercentageOfRM(percentage)}`)).toBeInTheDocument();
		}

		expect(screen.getByRole('button', { name: /Ver detalle/i })).toBeInTheDocument();
	});

	it('should show multiple movements', () => {
		const movements = MovementMother.list();
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withMultipleMovements(2, movements));

		renderWithRouting(<MovementsList />);

		expect(screen.getByText(movements[0].name)).toBeInTheDocument();
		expect(screen.getByText(movements[1].name)).toBeInTheDocument();

		const buttons = screen.getAllByRole('button', { name: /Ver detalle/i });
		expect(buttons.length).toBe(2);
	});
});
