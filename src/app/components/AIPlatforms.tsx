import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Tool {
  id: string;
  name: string;
  icon?: string;
  thumbnail?: string;
  url: string;
}

const fetchTools = async (): Promise<Tool[]> => {
  const res = await fetch("/api/tools");
  const data = await res.json();
  return data.slice(-10);
};

const AIPlatformsCarousel: React.FC = () => {
  const [latestAITools, setLatestAITools] = useState<Tool[]>([]);

  useEffect(() => {
    const getLatestTools = async () => {
      const tools = await fetchTools();
      setLatestAITools(tools);
    };
    getLatestTools();
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap relative mt-10">
      <ul className="flex animate-scroll gap-x-10 hover:animate-pause">
        {[...latestAITools, ...latestAITools].map((tool, index) => (
          <Link href={tool.url} key={index} className="flex items-center">
            <Image
              src={tool.icon || tool.thumbnail || "/default-icon.png"}
              alt={tool.name}
              title={tool.name}
              width={45}
              height={100}
              style={{ maxWidth: 150, margin: "0px 10px" }}
            />
            <p className="text-xl text-black">{tool.name}</p>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default AIPlatformsCarousel;
