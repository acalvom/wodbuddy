import type { UseQueryResult } from '@tanstack/react-query';
import { fireEvent, screen } from '@testing-library/react';
import type { Movement } from '@/features/movements/domain/entities/movement';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother';

export type ViewMovementPageTOType = UseQueryResult<Movement | undefined, Error>;

export class ViewMovementPageTO {
	private static base(result: Partial<ViewMovementPageTOType>) {
		return {
			data: undefined,
			isPending: false,
			isError: false,
			isLoading: false,
			...result
		} as ViewMovementPageTOType;
	}

	static loading() {
		return this.base({ isPending: true, isLoading: true });
	}

	static error() {
		return this.base({ isError: true });
	}

	static withMovement(movement = MovementMother.one()) {
		return this.base({ data: movement });
	}

	static notFound() {
		return this.base({ data: undefined });
	}
}

export class ViewMovementPageInteractor {
	static expectMovementNotFound() {
		expect(screen.getByText('Movimiento no encontrado')).toBeInTheDocument();
	}

	static expectMovementDetails(movement: Movement) {
		expect(screen.getByText(movement.name)).toBeInTheDocument();
		expect(screen.getByText(`Tu RM actual: ${movement.rm} kg`)).toBeInTheDocument();
	}

	static expectAddRMButton() {
		expect(screen.getByRole('button', { name: /añadir rm/i })).toBeInTheDocument();
	}

	static expectBackButton() {
		expect(screen.getByRole('button', { name: /volver/i })).toBeInTheDocument();
	}

	static expectPercentageCalculator() {
		expect(screen.getByText('Calcula tu porcentaje')).toBeInTheDocument();
	}

	static expectMarkHistory() {
		expect(screen.getByText('Histórico de marcas')).toBeInTheDocument();
	}

	static async clickAddRMButton() {
		const addButton = screen.getByRole('button', { name: /añadir rm/i });
		fireEvent.click(addButton);
	}

	static async clickBackButton() {
		const backButton = screen.getByRole('button', { name: /volver/i });
		fireEvent.click(backButton);
	}
}
