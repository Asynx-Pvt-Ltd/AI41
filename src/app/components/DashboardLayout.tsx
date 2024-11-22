import Link from "next/link";
import React from "react";

function DashboardLayout({ children }: any) {
  return (
    <div className="flex min-h-screen h-full">
      {/* Left Panel */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                href="/dashboard/feature-tools"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Feature Tools
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/categories"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Categories
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/tools"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Tools
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/tutorials"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Tutorials
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/news"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                AI News
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/dashboard/job-roles"
                className="block p-2 hover:bg-gray-700 rounded"
              >
                Job Roles
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
}

export default DashboardLayout;
