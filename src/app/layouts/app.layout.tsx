import { Outlet } from 'react-router';
import { Header } from '@/app/layouts/header/header.tsx';

export const AppLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
