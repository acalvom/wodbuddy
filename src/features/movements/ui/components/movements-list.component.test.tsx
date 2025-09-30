import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MovementMother } from '@/features/movements/domain/test/movement.mother.ts';
import { MovementsList } from '@/features/movements/ui/components/movements-list.component';
import { MovementsListComponentTO } from '@/features/movements/ui/components/movements-list.component.to.ts';

vi.mock('@/features/movements/ui/controllers/use-get-movements.hook');

import { useGetMovements } from '@/features/movements/ui/controllers/use-get-movements.hook';

const mockUseGetMovements = vi.mocked(useGetMovements);

describe('MovementsList', () => {
	it('shows loading state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.loading());

		render(<MovementsList />);

		expect(screen.getByText('Movements')).toBeInTheDocument();
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	it('shows error state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.error());

		render(<MovementsList />);

		expect(screen.getByText('Error loading movements')).toBeInTheDocument();
	});

	it('renders empty state', () => {
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withoutMovements());

		render(<MovementsList />);

		expect(screen.getByText('Movements')).toBeInTheDocument();
		expect(screen.getByText('No movements to show')).toBeInTheDocument();
	});

	it('renders one movement', () => {
		const movement = MovementMother.one();
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withOneMovement(movement));

		render(<MovementsList />);

		expect(screen.getByText(`${movement.id}: ${movement.name} - ${movement.rm} kg`)).toBeInTheDocument();
	});

	it('renders multiple movements', () => {
		const movements = MovementMother.list();
		mockUseGetMovements.mockReturnValue(MovementsListComponentTO.withMultipleMovements(2, movements));

		render(<MovementsList />);

		expect(screen.getByText(`${movements[0].id}: ${movements[0].name} - ${movements[0].rm} kg`)).toBeInTheDocument();
		expect(screen.getByText(`${movements[1].id}: ${movements[1].name} - ${movements[1].rm} kg`)).toBeInTheDocument();
	});
});
