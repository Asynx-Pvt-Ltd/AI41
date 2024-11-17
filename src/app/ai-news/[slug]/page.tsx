import { NextPage } from "next";

interface Props {
  slug: string;
}

const fetchSingleNews = async (title) => {
  const response = await fetch("/api/fetchSingleNews");
};
const Page: NextPage<Props> = ({ params }) => {
  return <div>{decodeURIComponent(params.slug)}</div>;
};

export default Page;
