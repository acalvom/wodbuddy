import { Outlet } from 'react-router-dom';

export const Main = () => {
	return (
		<div className="flex flex-col min-h-screen bg-background mx-8 my-4">
			<Outlet />
		</div>
	);
};
