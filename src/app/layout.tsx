'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import ClientSideToastContainer from './components/ClientSideToasterContainer';
import Script from 'next/script';
import { HelmetProvider } from 'react-helmet-async';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<Script src="https://cdn.lordicon.com/lordicon.js" />
			</head>
			<body className={inter.className}>
				<HelmetProvider>
					<ClientSideToastContainer />
					<Providers>{children}</Providers>
				</HelmetProvider>
			</body>
		</html>
	);
}
