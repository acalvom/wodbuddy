import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

export const Main = () => {
	return (
		<div className="flex flex-col min-h-screen bg-background mx-8 my-4">
			<Toaster />
			<Outlet />
		</div>
	);
};
