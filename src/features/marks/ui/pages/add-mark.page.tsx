import { Title } from '@/common/ui/custom-components/title/title';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook';
import { AddMarkForm, type ZodAddMark } from '../components/add-mark-form/add-mark-form.component';

export const AddMarkPage = () => {
	const { user } = useAuth();
	// const { mutateAsync: addMovement, isPending, error } = useAddNewMark();

	const onSubmit = async (data: ZodAddMark) => {
		if (!user?.id) return;
		try {
			console.log(data);
			// const newMovement = zodToDomain(data, user.id);
			// return await addMovement(newMovement);
		} catch {}
	};

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-sm">
				<Title className="text-center">Nueva RM</Title>
				<AddMarkForm onSubmit={onSubmit} isPending={false} />
				{/* <Toast type="error" title="Error añadiendo movimiento" description={error?.message} open={!!error} /> */}
			</div>
		</div>
	);
};
