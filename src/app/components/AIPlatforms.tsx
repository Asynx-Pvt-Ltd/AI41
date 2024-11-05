import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Tool {
  id: string;
  name: string;
  icon?: string; // optional field, since we want to fallback to 'thumbnail'
  thumbnail?: string;
}

const fetchTools = async (): Promise<Tool[]> => {
  const res = await fetch("/api/tools");
  const data = await res.json();
  return data.slice(-5); // Get the latest 5 tools
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
    <div className="overflow-hidden whitespace-nowrap relative">
      <ul className="flex animate-scroll">
        {latestAITools.map((tool) => (
          <li key={tool.id} className="flex items-center">
            <Image
              src={tool.icon || tool.thumbnail || "/default-icon.png"} // Fallback to default if both are missing
              alt={tool.name}
              title={tool.name}
              width={40}
              height={100}
              style={{ maxWidth: 150, margin: "0px 10px" }}
            />
            <p className="text-sm text-gray-600">{tool.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AIPlatformsCarousel;
