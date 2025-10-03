import { useNavigate } from 'react-router-dom';
import { Button } from '@/common/ui/shade-ui/components/ui/button.tsx';
import { MovementsList } from '@/features/movements/ui/components/movements-list/movements-list.component.tsx';

export const HomePage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<Button
				type="button"
				variant="outline"
				onClick={() => navigate('/create-movement')}
				className="btn btn-primary mb-4"
			>
				Añadir movimiento
			</Button>
			<MovementsList />
		</div>
	);
};
