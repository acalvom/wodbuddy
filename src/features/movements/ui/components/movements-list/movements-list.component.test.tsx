import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother.ts';
import { MovementsListComponentTO } from '@/features/movements/ui/components/movements-list/movements-list.component.to.ts';
import { MovementsList } from '@/features/movements/ui/components/movements-list/movements-list.component.tsx';
import { customRender } from '@/test/test-utils.tsx';

vi.mock('@/features/movements/ui/controllers/use-get-movements.hook');

import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook.ts';

const mockUseGetMovements = vi.mocked(useGetMovements);

describe('MovementsList', () => {
	it('shows loading state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.loading());

		render(<MovementsList />);

		expect(screen.getByTestId('loading')).toBeInTheDocument();
	});

	it('shows error state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.error());

		render(<MovementsList />);

		expect(screen.getByText('Error loading movements')).toBeInTheDocument();
	});

	it('renders empty state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());

		render(<MovementsList />);

		expect(screen.getByText('No movements to show')).toBeInTheDocument();
	});

	it('renders one movement with all percentage values and their formatted RM', () => {
		const movement = MovementMother.one({ rm: 20 });
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withOneMovement(movement));

		customRender(<MovementsList />);

		expect(screen.getByText(movement.name)).toBeInTheDocument();
		expect(screen.getByText(`RM: ${movement.rm} kg`)).toBeInTheDocument();

		const percentages = [50, 60, 70, 80, 85, 90, 95, 100];
		for (const percentage of percentages) {
			expect(screen.getByText(`${percentage}%`)).toBeInTheDocument();
			expect(screen.getByText(`${movement.formatPercentageOfRM(percentage)}`)).toBeInTheDocument();
		}

		expect(screen.getByRole('button', { name: /Ver detalle/i })).toBeInTheDocument();
	});

	it('renders multiple movements', () => {
		const movements = MovementMother.list();
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withMultipleMovements(2, movements));

		customRender(<MovementsList />);

		expect(screen.getByText(movements[0].name)).toBeInTheDocument();
		expect(screen.getByText(movements[1].name)).toBeInTheDocument();

		const buttons = screen.getAllByRole('button', { name: /Ver detalle/i });
		expect(buttons.length).toBe(2);
	});
});
