'use client';
import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
	title: string;
	description: string;
}
export default function SEO({ title, description }: Props) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
		</Helmet>
	);
}
