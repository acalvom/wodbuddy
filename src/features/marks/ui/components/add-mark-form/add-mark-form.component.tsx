import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DatePickerFormItem } from '@/common/ui/custom-components/form-items/datepicker-form-item.tsx';
import { InputFormItem } from '@/common/ui/custom-components/form-items/input-form-item.tsx';
import { SubmitButton } from '@/common/ui/custom-components/form-items/submit-button-item';
import { useConfetti } from '@/common/ui/hooks/use-confetti.hook.ts';
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
				<InputFormItem control={form.control} name="value" label="¿Peso?" placeholder="🏋🏻 102.5 kg" />

				<DatePickerFormItem control={form.control} name="createdOn" label="¿Cuándo?" placeholder="DD/MM/YYYY" />

				<SubmitButton isLoading={isPending}>Añadir marca</SubmitButton>
			</form>
		</Form>
	);
};
