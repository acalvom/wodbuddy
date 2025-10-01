import { describe, expect, it } from 'vitest';
import { Movement } from '@/features/movements/domain/entities/movement.ts';
import { MovementMother } from '@/features/movements/domain/mothers/movement.mother.ts';

describe('Movement Entity', () => {
	it('should create an instance using fromPrimitives()', () => {
		const movementPrimitives = MovementMother.primitives();
		const movement = Movement.fromPrimitives(movementPrimitives);

		expect(movement).toBeInstanceOf(Movement);
		expect(movement.id).toBe(movementPrimitives.id);
		expect(movement.name).toBe(movementPrimitives.name);
		expect(movement.userId).toBe(movementPrimitives.userId);
		expect(movement.rm).toBe(movementPrimitives.rm);
	});

	it('should calculate the percentage of RM', () => {
		const movement = MovementMother.one({ rm: 50 });

		expect(movement.getPercentageOfRM(50)).toBe(25);
		expect(movement.getPercentageOfRM(0)).toBe(0);
	});

	it('should return undefined for percentage of RM if RM is not set', () => {
		const movement = MovementMother.withoutRm();
		expect(movement.getPercentageOfRM(50)).toBeUndefined();
	});

	it('should format the percentage of RM', () => {
		const movement = MovementMother.one({ rm: 100 });
		expect(movement.formatPercentageOfRM(50)).toBe('50 kg (50%)');
		expect(movement.formatPercentageOfRM(0)).toBe('-');
	});
});
