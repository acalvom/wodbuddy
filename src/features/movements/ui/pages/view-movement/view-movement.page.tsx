import { useId, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DateFormatter } from '@/common/domain/date/date';
import { Parser } from '@/common/domain/parser/parser.ts';
import { Card } from '@/common/ui/custom-components/card/card.tsx';
import { CardContent } from '@/common/ui/custom-components/card/card-content.tsx';
import { CardFooter } from '@/common/ui/custom-components/card/card-footer.tsx';
import { CardHeader } from '@/common/ui/custom-components/card/card-header.tsx';
import { Loading } from '@/common/ui/custom-components/loading/loading.tsx';
import { Subtitle } from '@/common/ui/custom-components/subtitle/subtitle.tsx';
import { Title } from '@/common/ui/custom-components/title/title.tsx';
import { Toast } from '@/common/ui/custom-components/toast/toast.tsx';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { useGetMovement } from '@/features/movements/ui/controllers/use-get-movement.hook.ts';

interface Mark {
	id: number;
	movementId: number;
	date: Date;
	value: number;
	isPr: boolean;
}
const marksByMovement: Mark[] = [
	{
		id: 1,
		movementId: 1,
		date: new Date('2025-10-01'),
		value: 70,
		isPr: false
	},
	{
		id: 2,
		movementId: 1,
		date: new Date('2025-11-01'),
		value: 75,
		isPr: true
	},
	{
		id: 3,
		movementId: 1,
		date: new Date('2025-12-01'),
		value: 72,
		isPr: false
	}
];

export const ViewMovementPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const percentageId = useId();
	const weightResultRef = useRef<HTMLParagraphElement>(null);

	const { data: movement, isLoading, isError } = useGetMovement(movementId!);
	const pr = marksByMovement.find((mark) => mark.isPr);

	if (isLoading) return <Loading />;
	if (isError) return <Toast type="error" title="Error cargando movimiento" open={isError} />;
	if (!movement || !pr) return <div>Movement not found</div>;

	return (
		<Card>
			<CardHeader className="border-b border-foreground p-6 w-full">
				<Title>{movement.name}</Title>
				<Subtitle>{`Tu RM actual: ${movement.rm} kg`}</Subtitle>
				<Subtitle>{`Tu PR: ${pr.value} kg`}</Subtitle>
				<p className="text-xs text-muted-foreground mt-1">{`Conseguido el ${DateFormatter.format(pr.date)}`}</p>
			</CardHeader>

			<CardContent>
					<div className="w-full">
						<h3 className="font-semibold text-base mb-2 text-primary">Histórico de marcas</h3>
						<ul className="space-y-2">
							{marksByMovement.map((mark) => (
								<li
									key={mark.id}
									className={cn(
										'flex items-center justify-between rounded-lg px-3 py-2',
										mark.isPr ? 'bg-primary/10 border-l-4 border-primary' : 'bg-card'
									)}
								>
									<span className="text-sm">{DateFormatter.format(mark.date)}</span>
									{mark.isPr && <span className="ml-2 text-xs text-primary font-bold">PR</span>}
									<span className="font-medium">{mark.value} kg</span>
								</li>
							))}
						</ul>
					</div>

					<div className="border-t border-foreground pt-6 w-full">
						<h3 className="font-semibold text-base mb-2 text-primary">Calculadora de porcentaje</h3>
						<div className="flex flex-col gap-2">
							<label htmlFor={percentageId} className="text-sm font-medium">
								Porcentaje de RM (%)
							</label>
							<input
								type="number"
								id={percentageId}
								placeholder="Ingrese porcentaje"
								className="bg-card border border-border rounded-xl px-4 py-3 text-base focus:ring-primary focus:border-primary outline-none"
								min={0}
								max={100}
								onChange={(e) => {
									const percentage = parseInt(e.target.value, 10) || 0;
									const rm = movement.rm ?? 0;
									const weight = Math.round((rm * percentage) / 100);
									if (weightResultRef.current) {
										weightResultRef.current.textContent = `${percentage}% = ${weight} kg`;
									}
								}}
							/>
							<p ref={weightResultRef} className="text-sm text-muted-foreground">
								0% = 0 kg
							</p>
						</div>
				</div>
			</CardContent>

			<CardFooter>
				<div className="flex justify-end border-t border-neutral-200 pt-4 w-full">
					<Button type="button" variant="secondary" className="rounded-xl">
						Volver
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};
