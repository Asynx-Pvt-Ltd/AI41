import { SignIn } from '@clerk/nextjs';

export default function Page() {
	return (
		<div className="min-h-screen max-w-screen justify-center items-center flex">
			<SignIn />
		</div>
	);
}
