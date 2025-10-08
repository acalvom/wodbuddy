import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/common/ui/shade-ui/components/ui/form.tsx';
import { Input } from '@/common/ui/shade-ui/components/ui/input.tsx';
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

// El input será string, validamos y convertimos en el submit
const PercentageSchema = z.object({
	percentage: z
		.string()
		.regex(/^\d+$/, 'Solo números')
		.refine((val) => {
			const n = Number(val);
			return n >= 0 && n <= 100;
		}, 'Debe estar entre 0 y 100')
});

export const ViewMovementPage = () => {
	const { id } = useParams();
	const movementId = Parser.toInt(id!);

	const { data: movement, isLoading, isError } = useGetMovement(movementId!);
	const pr = marksByMovement.find((mark) => mark.isPr);
	const [result, setResult] = useState<string>('0% = 0 kg');

	type PercentageForm = z.infer<typeof PercentageSchema>;

	const form = useForm<PercentageForm>({
		resolver: zodResolver(PercentageSchema),
		defaultValues: { percentage: '0' },
		mode: 'onChange'
	});

	const onSubmit = (data: PercentageForm) => {
		const percentage = parseFloat(data.percentage.replace(',', '.')) || 0;
		const rm = movement?.rm ?? 0;
		// Redondear a múltiplos de 0.5
		const weight = Math.round(((rm * percentage) / 100) * 2) / 2;
		setResult(`${percentage}% = ${weight} kg`);
	};

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
				<div className="w-full mb-4">
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

				<div className="w-full border-t border-foreground pt-6">
					<h3 className="font-semibold text-md mb-2 text-primary">¿Qué porcentaje de RM quieres calcular?</h3>
					<Form {...form}>
						<form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-row items-end gap-2">
								<FormField
									control={form.control}
									name="percentage"
									render={({ field }) => (
										<FormItem className="flex-1">
											<FormControl>
												<Input type="text" inputMode="decimal" placeholder="Ingrese porcentaje" {...field} />
											</FormControl>
											<FormMessage className="text-xs mt-1" />
										</FormItem>
									)}
								/>
								<Button type="submit" className="glow cursor-pointer" variant="ghost">
									<Calculator />
								</Button>
							</div>
							<div className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-muted/60 border border-muted-foreground/10 min-h-[2.5rem]">
								<span className="text-base font-semibold text-primary">{result}</span>
							</div>
						</form>
					</Form>
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
