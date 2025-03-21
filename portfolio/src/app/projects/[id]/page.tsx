/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSingleProject } from '@/services/projectServices';

const ProjectDetails = () => {
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams(); 

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!params?.id) return; 
        const res = await getSingleProject(params.id as string);
        console.log(res);
        if (res.success) {
          setProject(res?.data);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params?.id]);

  if (isLoading) {
    return <div className="p-10 text-center text-lg font-semibold">Loading...</div>;
  }

  if (!project) {
    return <div className="p-10 text-center text-red-500 text-lg font-semibold">Project not found</div>;
  }

  return (
    <div className='min-h-screen'>

    <div className="p-14 max-w-3xl mx-auto rounded-lg">
      <h2 className="text-2xl font-bold ">{project?.title}</h2>
      <p className="text-1xl  py-6"><span className="font-semibold">Description: </span>{project?.description}</p>
      {project?.image && (
        <img
          src={project?.image}
          alt={project?.description}
          className="w-full h-auto max-h-80 object-cover rounded"
        />
      )}
      <p className="mt-4 text-sm  py-4">
        Link: <a href={project?.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{project?.link}</a>
      </p>
    </div>
    </div>
  );
};

export default ProjectDetails;