/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects } from "@/services/projectServices";

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        console.log(res);
        if (res?.success) {
          setProjects(res.data);
        } else {
          console.log(res.message);
          setIsError(true);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <Link href="/projects/addProject">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500">
            Add Project
          </button>
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch projects.</p>}

      {projects.length === 0 && !isLoading && !isError ? (
        <p className="text-center text-gray-500">No projects available.</p>
      ) : (
        <div className="grid gap-4">
          {projects.map((project: any) => (
            <div key={project._id} className="p-6 border rounded-lg shadow bg-slate-200">
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt="Project"
                  className="w-full h-auto max-h-80 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-bold mt-2">{project.title}</h2>
              <p className="mt-2 text-gray-700">{project.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-600">Link: {project.link}</p>
              <Link href={`/projects/${project._id}`}>
                <button className="mt-2 text-blue-500 hover:underline">
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
