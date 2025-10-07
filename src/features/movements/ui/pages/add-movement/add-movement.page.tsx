import { Title } from '@/common/ui/custom-components/title/title.tsx';
import { ErrorToast } from '@/common/ui/custom-components/toast/error-toast.tsx';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook.tsx';
import { AddMovementForm } from '@/features/movements/ui/components/add-movement-form/add-movement-form.component.tsx';
import { useAddNewMovement } from '@/features/movements/ui/controllers/use-add-new-movement.hook.ts';
import { zodToDomain } from '@/features/movements/ui/mappers/zod-to-domain.mapper.ts';
import type { ZodNewMovement } from '@/features/movements/ui/models/zod-new-movement.ts';

export const AddMovementPage = () => {
	const { user } = useAuth();
	const { mutateAsync: addMovement, isPending, error } = useAddNewMovement();

	const onSubmit = async (data: ZodNewMovement) => {
		if (!user?.id) return;
		try {
			const newMovement = zodToDomain(data, user.id);
			return await addMovement(newMovement);
		} catch {}
	};

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-sm">
				<Title className="text-center">Nuevo Movimiento</Title>
				<AddMovementForm onSubmit={onSubmit} isPending={isPending} />
				<ErrorToast error={error} />
			</div>
		</div>
	);
};
