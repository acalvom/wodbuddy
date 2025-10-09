import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePickerFormItem } from '@/common/ui/custom-components/form-items/datepicker-form-item.tsx';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item.tsx';
import { useConfetti } from '@/common/ui/hooks/use-confetti.hook.ts';
import { Button } from '@/common/ui/shade-ui/components/ui/button';
import { Form } from '@/common/ui/shade-ui/components/ui/form';
import { type ZodAddMark, ZodAddMarkFormSchema } from '../../models/zod-mark';

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
				<InputFormItem
					control={form.control}
					name="value"
					label="¿Peso?"
					placeholder="🏋🏻 102.5 kg"
				/>

				<DatePickerFormItem
					control={form.control}
					name="createdOn"
					label="¿Cuándo?"
					placeholder="DD/MM/YYYY"
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
