import { useState } from 'react';
import { useGetCurrentUser } from '@/features/auth/ui/controllers/use-get-current-user.hook.ts';
import { useLogin } from '@/features/auth/ui/controllers/use-login.hook.ts';
import { useLogout } from '@/features/auth/ui/controllers/use-logout.hook.ts';
import { useSignup } from '@/features/auth/ui/controllers/use-signup.hook.ts';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutateAsync: login, isPending: isLoggingIn, error: loginError } = useLogin();
	const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();
	const { mutateAsync: signup, isPending: isSigningUp } = useSignup();
	const { data: currentUser } = useGetCurrentUser();

	const handleLogin = () => login({ email, password });
	const handleSignup = () => signup({ email, password });

	if (currentUser) {
		return (
			<div>
				<p>Welcome {currentUser.email}</p>
				<button type="button" onClick={() => logout()} disabled={isLoggingOut}>
					Logout
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-md rounded-lg p-6 w-80">
				<input
					className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					type="email"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					className="w-full mb-3 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button
					className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
					type="button"
					onClick={handleLogin}
					disabled={isLoggingIn}
				>
					Login
				</button>
				<button
					className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
					type="button"
					onClick={handleSignup}
					disabled={isSigningUp}
				>
					Sign Up
				</button>
				{loginError && <p className="text-red-500 text-sm mb-2">Error: {(loginError as Error).message}</p>}
			</div>
		</div>
	);
}
