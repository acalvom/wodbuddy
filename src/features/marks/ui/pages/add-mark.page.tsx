import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Parser } from '@/common/domain/parser/parser';
import { Title } from '@/common/ui/custom-components/title/title';
import { Toast } from '@/common/ui/custom-components/toast/toast';
import { useConfetti } from '@/common/ui/hooks/use-confetti.hook';
import { useAuth } from '@/features/auth/ui/hooks/use-auth.hook';
import { AddMarkForm } from '../components/add-mark-form/add-mark-form.component';
import { useAddNewMark } from '../controllers/use-add-new-mark.hook';
import type { ZodNewMark } from '../models/zod-new-mark';
import { zodToDomain } from '../models/zod-to-domain.mapper';

export const AddMarkPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const movementId = Parser.toInt(id!);
	const { user } = useAuth();
	const { mutateAsync: addNewMark, isPending, isSuccess, error } = useAddNewMark(movementId!);
	const { triggerConfetti } = useConfetti();

	const onSubmit = async (data: ZodNewMark) => {
		if (!user?.id) return;
		try {
			const newMark = zodToDomain(data, user.id, movementId!);
			return await addNewMark(newMark);
		} catch {}
	};

	useEffect(() => {
		if (isSuccess) {
			triggerConfetti();
			navigate(`/movements/${movementId}`);
		}
	}, [isSuccess]);

	return (
		<div className="min-h-screen bg-background px-4 py-6">
			<div className="container mx-auto max-w-sm">
				<Title className="text-center">Nueva RM</Title>
				<AddMarkForm onSubmit={onSubmit} isPending={isPending} />
				<Toast type="error" title="Error añadiendo movimiento" description={error?.message} open={!!error} />
			</div>
		</div>
	);
};
