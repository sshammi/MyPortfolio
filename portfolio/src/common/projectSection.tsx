/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllProjects } from "@/services/projectServices";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProjectSection = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await getAllProjects();
        if (res?.success) {
          setProjects(res.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-8 lg:px-25 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">Recent Projects</h2>
      {isLoading && <p className="text-center">Loading projects...</p>}
      {isError && <p className="text-center text-red-500">Failed to load projects.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.slice(0, 3).map((project: any) => (
          <motion.div
            key={project._id}
            className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full"
            whileHover={{ scale: 1.05 }}
          >
            <div>
              <div className="w-full h-[200px] overflow-hidden rounded-md mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Description: </span>
                {project.description?.length > 50
                  ? `${project.description.slice(0, 50)}...`
                  : project.description}
              </p>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Link: </span>
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {project.link}
                </a>
              </p>
            </div>

            {/* View Project Link Inside the Card */}
            <div className="mt-4">
              <Link href={`/projects/${project._id}`} className="text-gray-900 hover:underline block">
                View Project →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/projects"
          className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          View All Projects
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
