import { useEffect } from 'react';
import toast from 'react-hot-toast';

// TODO: generalizar toast para eventos success y error
// TODO: añadir icono correspondiente y estilos del tema tailwind
// TODO: permitir personalizar mensaje
// TODO: añadir descripción opcional con el error.message
export const ErrorToast = ({ error }: { error: Error | null }) => {
	useEffect(() => {
		if (error)
			toast(`Error añadiendo movimiento: ${error.message}`, {
				style: { background: 'red', color: 'white', fontSize: 'small' }
			});
	}, [error]);
	return null;
};
