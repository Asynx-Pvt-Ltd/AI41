import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

const isDashboardRoute = createRouteMatcher(['/dashboard(.*)']);
const isApiRoute = createRouteMatcher([
	'/api/addNews(.*)',
	'/api/addTutorials(.*)',
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
	if (isDashboardRoute(req)) {
		await auth.protect();
	}
});

async function customMiddleware(req: NextRequest) {
	console.log(isApiRoute(req));
	if (isApiRoute(req)) {
		const allowedOrigins = [
			'localhost:3000',
			'https://ai41.org/',
			// 'toolsdirectory-phi.vercel.app',
			'167.88.44.78:3000',
		];
		const origin = req.headers.get('x-forwarded-host') ?? '';
		const isAllowedOrigin = allowedOrigins.includes(origin);

		if (isAllowedOrigin) {
			return NextResponse.next();
		}

		const authHeader = req.headers.get('Authorization');
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const token = authHeader.split(' ')[1];
		if (token !== process.env.AUTHORIZATION_TOKEN) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
	}

	return NextResponse.next();
}

export default async function middleware(
	req: NextRequest,
	event: NextFetchEvent,
) {
	const clerkResponse = await clerkHandler(req, event);
	if (clerkResponse && clerkResponse.status !== 200) {
		return clerkResponse;
	}
	return customMiddleware(req);
}

export const config = {
	matcher: ['/dashboard/:path*', '/api/addNews', '/api/addTutorials', '/'],
};
