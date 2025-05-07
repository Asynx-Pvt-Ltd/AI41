import { NextPage } from 'next';
import Tool from './ToolsPage';

interface Props {
	params: Promise<{
		slug: string;
	}>;
}

const fetchTool = async (slug: string) => {
	const response = await fetch(
		process.env.NEXT_PUBLIC_BASE_URL + `/api/tools/slug/${slug}`,
	);
	const data = await response.json();
	return data;
};
export async function generateMetadata({ params }: Props) {
	const { slug } = await params;
	const data = await fetchTool(slug);
	return {
		title: data.tool.metaTitle ?? '',
		description: data.tool.metaDescription ?? '',
	};
}

const Page: NextPage<Props> = async ({ params }) => {
	const { slug } = await params;
	const data = await fetchTool(slug);
	return <Tool tool={data.tool} />;
};

export default Page;
