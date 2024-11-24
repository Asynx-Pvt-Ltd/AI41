"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

interface JobRoleInfo {
  id: number;
  name: string;
}

interface Tool {
  id: number;
  icon: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  url: string;
  pricing: string;
  thumbnail: string;
  jobRoles: JobRoleInfo[]; // Updated to match the actual API response
  tags: string[];
}

interface JobRole {
  id: number;
  name: string;
  slug: string;
  tools: {
    toolId: number;
    jobRoleId: number;
  }[];
}

export default function JobRolePage() {
  const [jobRole, setJobRole] = useState<JobRole | null>(null);
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ title: string }>();

  if (!params) return;
  useEffect(() => {
    if (!params.title) return;

    Promise.all([
      fetch(`/api/job-roles?category=${params.title}`).then((res) =>
        res.json()
      ),
      fetch("/api/tools").then((res) => res.json()),
    ])
      .then(([jobRoleData, toolsData]) => {
        setJobRole(jobRoleData);

        // Filter tools that belong to the current job role
        const filteredTools = toolsData.filter((tool: Tool) =>
          tool.jobRoles.some((role) => role.id === jobRoleData.id)
        );

        setTools(filteredTools);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
        setLoading(false);
      });
  }, [params.title]);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 px-6 pb-6">
          <div className="text-center text-red-600">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white dark:bg-gray-800 w-full pt-10 px-6 pb-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black dark:border-white"></div>
          </div>
        ) : jobRole ? (
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">
              Tools for {jobRole.name}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={tool.icon}
                        alt={`${tool.name} icon`}
                        className="w-10 h-10 mr-3 object-cover rounded"
                      />
                      <h3 className="text-xl font-semibold">{tool.name}</h3>
                    </div>
                    <div
                      className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: tool.shortDescription,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tool.pricing}
                      </span>
                      <Link
                        href={"/tool/" + tool.slug}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {tools.length === 0 && (
              <div className="text-center text-gray-600 dark:text-gray-300">
                No tools found for this job role.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">Job role not found.</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
