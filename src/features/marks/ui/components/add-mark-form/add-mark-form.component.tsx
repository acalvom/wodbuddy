import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { DateFormatter } from '@/common/domain/date/date';
import { useConfetti } from '@/common/ui/hooks/use-confetti.hook.ts';
import { cn } from '@/common/ui/shade-ui/components/lib/utils';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { Calendar } from '@/common/ui/shade-ui/components/ui/calendar';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/common/ui/shade-ui/components/ui/form';
import { Input } from '@/common/ui/shade-ui/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/common/ui/shade-ui/components/ui/popover';

export const ZodAddMarkFormSchema = z.object({
	value: z
		.string()
		.min(1, 'El valor es obligatorio')
		.regex(/^\d+(\.\d+)?$/, 'Debe ser un número válido (ej: 100.5)')
		.refine((val) => parseFloat(val) > 0, 'Debe ser mayor que 0'),
	createdOn: z.date().optional()
});

export type ZodAddMark = z.infer<typeof ZodAddMarkFormSchema>;

type AddMarkFormProps = {
	onSubmit: (data: ZodAddMark) => void;
	isPending?: boolean;
};

export const AddMarkForm = ({ onSubmit, isPending = false }: AddMarkFormProps) => {
	const { triggerConfetti } = useConfetti();

	const form = useForm<ZodAddMark>({
		resolver: zodResolver(ZodAddMarkFormSchema),
		defaultValues: {
			value: '',
			createdOn: undefined
		}
	});

	const handleSubmit = (data: ZodAddMark) => {
		triggerConfetti();
		onSubmit(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="glass w-full max-w-md space-y-6 p-6">
				<FormField
					control={form.control}
					name="value"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-foreground font-medium text-sm mb-2 block">¿Peso?</FormLabel>
							<FormControl>
								<Input
									className="bg-card border-border text-foreground placeholder:text-muted-foreground 
											focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl
											h-12 w-full touch-manipulation"
									placeholder="🏋🏻 102.5 kg"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-xs mt-1" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="createdOn"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel className="text-foreground font-medium text-sm mb-2 block">¿Cuándo?</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											className={cn(
												'bg-card border-border text-foreground placeholder:text-muted-foreground focus:ring-primary focus:border-primary py-4 px-4 text-base rounded-xl h-12 w-full touch-manipulation justify-start text-left font-normal',
												!field.value && 'text-muted-foreground'
											)}
										>
											{field.value ? DateFormatter.format(field.value) : <span>DD/MM/YYYY</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
										captionLayout="dropdown"
									/>
								</PopoverContent>
							</Popover>
							<FormMessage className="text-xs mt-1" />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={isPending}
					className="glow w-full py-4 px-6 text-base font-semibold mt-8 
							h-12 rounded-xl touch-manipulation active:scale-95 transition-transform"
				>
					Añadir marca
				</Button>
			</form>
		</Form>
	);
};
