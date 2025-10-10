import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/common/ui/shade-ui/components/ui/form.tsx';
import { Input } from '@/common/ui/shade-ui/components/ui/input.tsx';
import type { Movement } from '@/features/movements/domain/entities/movement';
import { type ZodPercentageForm, ZodPercentageSchema } from '../../models/zod-percentage';

export const CalculatePercentageForm = ({ movement }: { movement: Movement }) => {
	const [result, setResult] = useState<string>(movement.formatCalculatorPercentageOfRM(0));

	const form = useForm<ZodPercentageForm>({
		resolver: zodResolver(ZodPercentageSchema),
		defaultValues: { percentage: '' }
	});

	const onSubmit = (data: ZodPercentageForm) => {
		const percentageOfRM = movement.formatCalculatorPercentageOfRM(data.percentage);
		setResult(percentageOfRM);
	};

	return (
		<Form {...form}>
			<form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-row gap-2">
					<FormField
						control={form.control}
						name="percentage"
						render={({ field }) => (
							<FormItem className="flex-1">
								<FormControl>
									<Input type="text" inputMode="decimal" placeholder="50, 65, 80..." className="text-sm" {...field} />
								</FormControl>
								<FormMessage className="text-xs mt-1" />
							</FormItem>
						)}
					/>
					<Button type="submit" className="glow" variant="ghost" aria-label="Calcular porcentaje">
						<Calculator />
					</Button>
				</div>
				<div className="flex items-center justify-center gap-2 mt-4 p-3 rounded-lg bg-muted/60 border border-muted-foreground/10 min-h-[2.5rem]">
					<span className="text-base font-semibold text-primary">{result}</span>
				</div>
			</form>
		</Form>
	);
};
