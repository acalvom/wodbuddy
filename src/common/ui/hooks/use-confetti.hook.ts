import confetti from 'canvas-confetti';
import { useCallback } from 'react';

export const useConfetti = () => {
	const triggerConfetti = useCallback(() => {
		const colors = [
			'#a855f7', // primary (oklch(0.68 0.22 295))
			'#3b82f6', // secondary (oklch(0.72 0.16 210))
			'#8b5cf6', // accent (oklch(0.75 0.17 270))
			'#06b6d4', // info (oklch(0.7 0.15 235))
			'#10b981' // success (oklch(0.72 0.15 150))
		];

		// Primer burst
		confetti({
			particleCount: 50,
			angle: 60,
			spread: 55,
			origin: { x: 0.5, y: 0.6 },
			colors,
			gravity: 1.2,
			scalar: 1.2
		});

		// Segundo burst
		confetti({
			particleCount: 50,
			angle: 120,
			spread: 55,
			origin: { x: 0.5, y: 0.6 },
			colors,
			gravity: 1.2,
			scalar: 1.2
		});

		// Tercer burst
		setTimeout(() => {
			confetti({
				particleCount: 30,
				startVelocity: 30,
				spread: 360,
				origin: { x: 0.5, y: 0.5 },
				colors,
				scalar: 0.8
			});
		}, 200);
	}, []);

	return {
		triggerConfetti
	};
};
